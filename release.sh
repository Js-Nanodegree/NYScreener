git add -A &&
git commit -m 'build release' &&
git push &&
1234 &&
git push heroku main &&
heroku open &&
heroku logs --tail
