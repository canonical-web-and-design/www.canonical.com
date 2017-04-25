Canonical.com website project
===

## Prerequisites

1. Install docker:
   https://robinwinslow.co.uk/2015/04/02/installing-docker-on-ubuntu/
2. Install docker-compose > 1.4: `sudo pip install --upgrade docker-compose`
3. Login with your hub.docker.com account: `docker login`
4. Get all the pip requirements `pip install -r requirements/dev.txt`

## Run

Auto-compile sass files and run the dev server
``` bash
make run
```

Now visit <http://127.0.0.1:8002>

License
---

The content of this project is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/), and the underlying code used to format and display that content is licensed under the [LGPLv3](http://opensource.org/licenses/lgpl-3.0.html) by [Canonical Ltd](http://www.canonical.com/).


With ♥ from Canonical
