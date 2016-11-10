import urllib.request

def test():
	url = 'qq'
	f = urllib.request.urlopen(url)
	return f.read(100).decode('utf-8')
test()
