# Petal & Stem Database Tables

## Users Table

| id | fullname       | username | email         | password(hashed)      |
|----|----------------|----------|---------------|-----------------------|
| 1  | David Sanchez | oldirty  | hi@aol.com    | asDasda9f767623rhgdf  |

## Species Plant Table

| id | name | location_type(FK) | cycle_type(FK) | picture   | user_id(FK) |
|----|------|-------------------|----------------|-----------|-------------|
| 1  | iris | outdoor           | annual         | iris.url  | 1           |

## Location

| id | type (unique field) |
|----|---------------------|
| 1  | indoor              |
| 2  | outdoor             |

## Cycle

| id | type (unique field) |
|----|---------------------|
| 1  | annual              |
| 2  | biennial            |
| 3  | perennial           |
| 4  | other               |

## Personal Plant Table

| id | nickname | log         | user_id(FK) | species_id(FK) |
|----|----------|-------------|-------------|----------------|
| 1  | chowder  | Brand new   | 1           | 1              |

## Pest Table

| id | name | picture   | log         | user_id(FK) |
|----|------|-----------|-------------|-------------|
| 1  | ants | ants.url  | I h8 antz   | 1           |
