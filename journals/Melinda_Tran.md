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

Finished my edit species endpoint
