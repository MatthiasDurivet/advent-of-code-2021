# Advent of code 2021

The goal of this repo is to have fun writing code.

This year I'll try to solve the solutions in a visual way using React.

## Documentation-first coding

More often than nopt I find myself lacking in documentation. A lot of considerations and trade-offs are made in my mind but they never end up documented somewhere.
One of my goals this year is to write documentation first before starting to code.
That's the reason why I'm making this README so extensive. :rofl:

Something to keep in mind is to always start each day with a rough sketch of how to approach the problem.
When something in the implementation is particularly interesting or is worth documenting I will try to do so.

## Atoms, Molecules and Pages

The react components are divided into 3 folders, Atoms, Molecules and Pages.

### Atoms

Atoms are small components that only rely on standard packages.
They are simple objects like buttons, popups, etc.

If an atom would try to import another atom it's no longer an atom. It should become a molecule.

### Molecules

Molecules are a step above atoms. They combine atoms into working components on the web page.
Molecules should still aim to be as small as possible to avoid creating "god components".

### Pages

Pages are the largest React components, they are a 1 to 1 mapping with the available Routes for the website.

Clearly defining a page and it's responsibilities will help prevent creating too complex structures.
Even if a page is only slightly different from another page in layout, it may be reasonable to make two separate pages.

## Challenges

Advent of code exists of 31 challenges, progressively getting more complicated.
Therefore the website should have a navigation bar that shows all the days.
It could for example be structured like an advent calendar.

## Parsing the input

An advent of code problem traditionally starts with an input file.
The user should be able to upload an input file for each day's challenge.

## Goal of the website

While the goal of the challenge is to compute an output value, this should not be the goal of the website.
That would allow others to cheat and get the answer by simply using the website.
Instead the website will aim to visualize the problem and solution in an attractive manner.

The visuals should be ready for social media, weekly slides, blog posts, etc.
Another goal is to attract as many developers at ML6 to partake in the event.

## How to visualize

Another goal is to explore as many ways of visualizing as possible.
This will be a good challenge to think outside-the box and find a custom solution for each day.

Some initial ideas are:

- canvas element
- css animations
- graphs & charts
- step-by-step motion ascii art
- raw conversion from text to json-like object

## Deployment

This website is deployed with heroku for easy and free hosting.

## Git

This react-app is connected to my @ml6 github account to show it off in the future.
The repo will stay private until advent of code is over
TODO: make repo public when it's over.

## Days

### Day 1

### Day 2

### Day 3

### Day 4

### Day 5

### Day 6

### Day 7

### Day 8

### Day 9

### Day 10

### Day 11

### Day 12

### Day 13

### Day 14

### Day 15

### Day 16

### Day 17

### Day 18

### Day 19

### Day 20

### Day 21

### Day 22

### Day 23

### Day 24

### Day 25

### Day 26

### Day 27

### Day 28

### Day 29

### Day 30

### Day 31