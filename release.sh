git add -A &&
git commit -m 'build release' &&
git push &&
git push heroku main &&
heroku open &&
heroku logs --tail
