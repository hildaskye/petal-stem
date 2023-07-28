# Petal & Stem

- Melinda Tran
- Cindy Lam
- Dylan Winn
- David Sanchez
- Alan Y.C. Cheng

Petal & Stem - Your one-stop shop for Plant and Pest information.

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)

## Intended market

Our intended target audience is for gardening enthusiasts.

The website includes user-generated information on plant species, individual plant that the user would have in his/her online garden page, and pest information useful for gardening.

## Functionality

- New users will first have to sign up with a new account to access the website

- Registered users will have to login to access information of the site

- After logging in, users will be able to access the site through two streams - Plant Information and Pest Information
  - In Plant information, users will first have to create that particular plant species information, and then users can then create individual plants that the users can add to their individual garden page
  - In Pest information, users can create specific pest and generate useful pest information to share with other users on the website

## Step-by-step Instructions to Run the Project

To use this application on the local machine, please follow these steps:

1. Open Terminal in your computer

2. Go to your folder where you want to save this program (replace the path with the path to your folder destination):

```
cd {path to your folder}
```

3. Run the following command in your Terminal to download the code of this program to your computer via the "Clone with HTTPS" method:

```
git clone https://gitlab.com/petal-stem/petal-stem
```

4. Dive into the newly downloaded program folder:

```
cd petal-stem
```

5. Run this command:

```
docker-compose down --volumes
```


6. Create a new database (Docker Volume) with the name "beta-data" in your local computer for this program to store data in:

```
docker volume create postgres-data
```

7. Create the blueprints (Docker Images) for the program:

```
docker-compose build --no-cache
```

8. Create the isolated environments (Docker Containers) for the program:

```
docker-compose up
```

9. Exit the container's CLI, and use Petal & Stem's product.



<!-- 1. Clone repository down
2. CD into the new project directory
3. Run `docker-compose down --volumes`
4. Run `docker volume create postgres-data`
5. Run `docker-compose build --no-cache`
6. Run `docker-compose up`
7. Exit the container's CLI, and enjoy Petal & Stem's product! -->
