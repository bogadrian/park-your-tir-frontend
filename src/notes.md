backend: \${url}

frontend: https://park-your-tir.herokuapp.com

How do I clear the build cache?
Issue
You want to clear the build cache for your app.

Resolution
You can clear the build cache for an app using the following commands:

$ heroku plugins:install heroku-repo
$ heroku repo:purge_cache -a appname
$ git commit --allow-empty -m "Purge cache"
$ git push heroku master
