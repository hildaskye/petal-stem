## 06/27/23

We received feedback on our wireframe and endpoints.
Using this feedback, we reconceptualized some of our project ideas and restructured some of our endpoints. We had to brainstorm more endpoints to make sure that all group members will have enough endpoints/work.

## 06/29/23

Discussed on high level an overview of the user stories. Figured out our data relationships and our database tables.

## 06/30/23

Getting the ball rolling on project setup.
Using VSCode Live Share, team worked together to get Postgres set up, Docker running, and Bee Keeper connected.

## 07/10/23

Got all of our database tables figured out and set up.
Ran into a migration issue - had to change names and numbers of migrations because there was something about a duplication. FastAPI container on Docker kept exiting - had to drop example tables, restart containers, and then it worked.

## 07/11/23

Updated issues/user stories and delegated some of the required tasks to team members

## 07/12/23

Delegated endpoints to group members.
Worked collaboratively on the plant detail page endpoint using the VSCode Live Share feature
Referencing the videos from explorations/Learn on FastAPI for the endpoint

## 07/13/23

Finished up the edit pest endpoint. Ran into a error ' pydantic.error_wrappers.ValidationError: < unprintable ValidationError object> '
and resolved it by deleting the List in the response_model in the @router.put statement. Discussed with group the pace we need to move along in the project.

## 07/14/23

Group looked over Cindy's endpoint because she was getting a 500 error, had Liz come in to take a look. Not really sure how exactly it was fixed. Wanted to take another look to make sure all records were showing, currently only the first record was showing.

## 07/17/23

I had two commits that were not pushed up, and when I tried pushing all my commits up today, the merge was blocked. Tried fixing this by pulling main but somehow ended up with divergent branches. I believe I resolved it in the vscode merge conflict resolver, which merged the branch automatically after and the merge request was resolved (however, did not need approval).

Finished two endpoints: edit species and delete species

Noticed main.py is getting long with all the routers, should we condense code and put some of these together?

## 07/18/23

David's docker container was not showing logs, so Liz and Rosheen came by to debug that, eventually they got it working (don't know the fix since they moved to different room).
Went over how to create endpoints with teammate.
Accidentaly wrote in journal on main but did not commit, stackoverflow shows that since it was not committed i can just git checkout to my dev branch. Checked git log and git status, looks okay.

Starting backend-auth (rewatching vid)
requirements.txt -> fastapi ... 0.81.0, jwtdown...>=0.2.0
docker-compose -> fastapi envir
signingkey = 328c45625f7de7dab454a47c364f1e2d804353039e2c506dd630967891e47452
(key generated from openssl rand ...)
do we need the wait host??

Potential blocker: fastapi page (localhost:8000/doc) not working - getting keyerror: signingkey (had it in dockercompose.yml, took it out, had it in authenticator.py and commented it out, still getting error)

## 07/19/23

David and I went over backend auth, got the fastapi working again with Liz's help. The yaml file needed postgres:5432 in the hosts section. Tried to put the POST req in to create an account, got a 500 error (hashed_password not in relation to users db), so thinking of changing hashed_password to password like in our db. Going to go over the auth videos to see what's going on.

## 07/20/23

Finished backend auth and worked on frontend auth. For the backend, we kept getting a 404 error - we were able to create an account just fine (showed up in fastapi and beekeeper) but during that process it's supposed to log you in with those credentials and that was not working. Liz and Caleb came by yesterday for an hour and half to try to figure this out, but we still couldn't get it. Zach came in today and we got it figured out - had to have the get_all function actually implemented, we put a pass there at the time while we were testing things out.

## 07/21/23

Came in on a Saturday to work on front end auth. Got signup form working, login form partially working. Able to confirm signup was working on fastapi and on beekeeper, could not confirm login.
At Caleb's suggestion, we copied over the index.tsx from galvanize's jwtdown-for-react and changed the register component to email instead of username. We added this new file and then imported it, and had to change our other imports to reflect this change.

## 07/24/23

Practice assessment in the morning so that cut out a huge chunk of time. Had some errors in the console (syntax, uncaught promise, 401, etc) so recopied over the index.tsx and changed only the register function (had other lines in there before from troubleshooting). Errors went away, functionality still okay. David having an environment issue, code same as everyone but not working on his computer.
For login - shows as username but must enter in email to login.
Dylan said she will add in the logout button, and the sign in button.

## 07/25/23

Starting deployment. Most of backend deployment is done, got db deployed but api has not deployed correctly yet - getting panic error when trying to get logs for stemapi.
Caleb came by and tried to help. Communicating with Rosheen on HMU to get this resolved. Hopefully tomorrow we can get the api deployed as well, and we can get the frontend deployed smoothly as well. Then the plan is to work on unit tests since that should be the last requirement for grading that we need.
