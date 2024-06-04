import re
from urllib.parse import urlparse, urlencode
import ipaddress
from bs4 import BeautifulSoup
import whois
import urllib
import urllib.request
from datetime import datetime
import requests

class FeatureExtractor:
    def __init__(self, url):
        self.url = url
        self.domain = self.getDomain()
        self.domain_name = None
        self.response = self.getResponse()

    # Address Bar Based Features
    def getDomain(self):
        domain = urlparse(self.url).netloc
        if re.match(r"^www.", domain):
            domain = domain.replace("www.", "")
        return domain

    def havingIP(self):
        try:
            ipaddress.ip_address(self.url)
            return 1
        except:
            return 0

    def haveAtSign(self):
        return 1 if "@" in self.url else 0

    def getLength(self):
        return 0 if len(self.url) < 54 else 1

    def getDepth(self):
        s = urlparse(self.url).path.split('/')
        depth = sum(len(segment) != 0 for segment in s)
        return depth

    def redirection(self):
        pos = self.url.rfind('//')
        return 1 if pos > 6 else 0

    def httpDomain(self):
        return 1 if 'https' in self.domain else 0

    def tinyURL(self):
        shortening_services = r"bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|" \
                              r"yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|" \
                              r"short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|" \
                              r"doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.co|lnkd\.in|db\.tt|" \
                              r"qr\.ae|adf\.ly|goo\.gl|bitly\.com|cur\.lv|tinyurl\.com|ow\.ly|bit\.ly|ity\.im|q\.gs|is\.gd|" \
                              r"po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|x\.co|" \
                              r"prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|" \
                              r"tr\.im|link\.zip\.net"
        return 1 if re.search(shortening_services, self.url) else 0

    def prefixSuffix(self):
        return 1 if '-' in self.domain else 0

    # Domain Based Features
    def getDNS(self):
        try:
            self.domain_name = whois.whois(self.domain)
            return 0
        except:
            return 1


    def domainAge(self):
        if self.domain_name:
            creation_date = self.domain_name.creation_date
            expiration_date = self.domain_name.expiration_date
            if isinstance(creation_date, str) or isinstance(expiration_date, str):
                try:
                    creation_date = datetime.strptime(creation_date, '%Y-%m-%d')
                    expiration_date = datetime.strptime(expiration_date, "%Y-%m-%d")
                except:
                    return 1
            if not creation_date or not expiration_date:
                return 1
            if isinstance(creation_date, list) or isinstance(expiration_date, list):
                return 1
            age_of_domain = abs((expiration_date - creation_date).days)
            return 1 if (age_of_domain / 30) < 6 else 0
        return 1

    def domainEnd(self):
        if self.domain_name:
            expiration_date = self.domain_name.expiration_date
            if isinstance(expiration_date, str):
                try:
                    expiration_date = datetime.strptime(expiration_date, "%Y-%m-%d")
                except:
                    return 1
            if not expiration_date:
                return 1
            if isinstance(expiration_date, list):
                return 1
            today = datetime.now()
            end = abs((expiration_date - today).days)
            return 0 if (end / 30) < 6 else 1
        return 1

    # HTML & Javascript Based Features
    def getResponse(self):
        try:
            return requests.get(self.url)
        except:
            return ""

    def iframe(self):
        if not self.response:
            return 1
        return 0 if re.findall(r"[|]", self.response.text) else 1

    def mouseOver(self):
        if not self.response:
            return 1
        return 1 if re.findall("", self.response.text) else 0

    def rightClick(self):
        if not self.response:
            return 1
        return 0 if re.findall(r"event.button ?== ?2", self.response.text) else 1

    def forwarding(self):
        if not self.response:
            return 1
        return 0 if len(self.response.history) <= 2 else 1

    def extractFeatures(self):
        features = [
            self.havingIP(),
            self.haveAtSign(),
            self.getLength(),
            self.getDepth(),
            self.redirection(),
            self.httpDomain(),
            self.tinyURL(),
            self.prefixSuffix(),
            self.getDNS(),
            self.domainAge(),
            self.domainEnd(),
            self.iframe(),
            self.mouseOver(),
            self.rightClick(),
            self.forwarding()
        ]
        return features
