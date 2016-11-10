import urllib
import queue
from flask import Flask, request
import threading

app = Flask(__name__)


@app.route("/")
def hello():
    return 'teste'

@app.route("/newTab")
def newTab():
    url = request.args.get('url')
    f = urllib.request.urlopen(url)
    return f.read().decode('utf-8')


if __name__ == "__main__":
    #time.sleep(5)
    try:
        app.run(host='127.0.0.1', port=5000)
    except Exception as e:
        print(e)

"""
    for t in abas:
        if not t.isAlive():
            # get results from thtead
            t.handled = True
    my_threads = [t for t in abas if not t.handled]
    class Aba(Thread):
        def __init__(self, url):
            Thread.__init__(self)
            self.url = url

        def run(self):
            f = urllib.request.urlopen('http://' + url)
            data = f.read().decode('utf-8')

class FetchUrl(threading.Thread):
    def __init__(self, url):
        threading.Thread.__init__(self)
        self.url = url

    def run(self):
        urlHandler = urllib2.urlopen(self.url)
        html = urlHandler.read()
        print "'%s\' fetched in %ss" % (self.url,(time.time() - start))

for url in urls:
    FetchUrl(url).start()

#Join all existing threads to main thread.
for thread in threading.enumerate():
    if thread is not threading.currentThread():
        thread.join()

print "Elapsed Time: %s" % (time.time() - start)
"""
