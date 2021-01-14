# Banka

[![Build Status](https://travis-ci.org/Cavdy/Banka.svg?branch=develop)](https://travis-ci.org/Cavdy/Banka)
[![Coverage Status](https://coveralls.io/repos/github/Cavdy/Banka/badge.svg?branch=develop)](https://coveralls.io/github/Cavdy/Banka?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/cf7325a7541c1edef111/maintainability)](https://codeclimate.com/github/Cavdy/Banka/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cf7325a7541c1edef111/test_coverage)](https://codeclimate.com/github/Cavdy/Banka/test_coverage)

This is a banking web app

## Getting Started

## Clone the Repository.

https://github.com/Cavdy/Banka.git

## Prerequisites

- Node v10.15.0 or above
- Npm v6.4 or above

## Endpoints

<table>
<tr>
    <th>HTTP VERB</th>
	<th>ENDPOINT</th>
	<th>FUNCTIONALITY</th>
</tr>
<tr>
	<td>POST</td>
	<td>api/auth/signup</td>
	<td>Users can signup</td>
</tr>
<tr>
	<td>POST</td>
	<td>api/auth/signup/addstaff</td>
	<td>Admin can add staffs</td>
</tr>
<tr>
	<td>POST</td>
	<td>api/auth/signin</td>
	<td>Users can signin</td>
</tr>
<tr>
	<td>GET</td>
	<td>api/v1/accounts</td>
	<td>Gets all accounts</td>
</tr>
<tr>
	<td>GET</td>
	<td>api/v1/accounts/:accountnumber</td>
	<td>Gets account by accountnumber</td>
</tr>
<tr>
	<td>GET</td>
	<td>api/v1/accounts/:accountnumber/transactions</td>
	<td>Gets all transactions by accountnumber</td>
</tr>
<tr>
	<td>POST</td>
	<td>api/v1/accounts</td>
	<td>Users can create account</td>
</tr>
<tr>
	<td>PATCH</td>
	<td>api/v1/accounts/accountNumber</td>
	<td>Staff and Admin can be modify account</td>
</tr>
<tr>
	<td>DELETE</td>
	<td>api/v1/accounts/accountNumber</td>
	<td>Staff and Admin can be delete account</td>
</tr>
<tr>
	<td>GET</td>
	<td>api/v1/transactions/:transactionid</td>
	<td>Users can view a particular transaction</td>
</tr>
<tr>
	<td>POST</td>
	<td>api/v1/transactions/accountNumber/debit</td>
	<td>Staffs and Admin can debit users</td>
</tr>
<tr>
	<td>POST</td>
	<td>api/v1/transactions/accountNumber/credit</td>
	<td>Staffs and Admin can credit users</td>
</tr>
<tr>
	<td>GET</td>
	<td>api/v1/users</td>
	<td>Staffs and Admin can see all users</td>
</tr>
<tr>
	<td>GET</td>
	<td>api/v1/users/:email/accounts</td>
	<td>get accounts that belongs to eamil</td>
</tr>
<tr>
	<td>DELETE</td>
	<td>api/v1/users/:id</td>
	<td>Staffs and Admin can delete users</td>
</tr>
</table>

## Installation

**On your Local Machine**

- Pull the [develop](https://github.com/Cavdy/Banka.git) branch off this repository
- Run `npm install` to install all dependencies
- Run `npm run dev` to start the app
- Access endpoints on **localhost:5100**

## Running the tests

Run `npm test` in the terminal for the cloned folder.

## Built With

- [Node.js](http://www.nodejs.org/) - Runtime-Enviroment

## GitHub Url Pages

URL: https://cavdy.github.io/Banka/

## Heroku Link

URL: https://bankaapp-api.herokuapp.com/

## API Documentation

URL: https://bankaapp-api.herokuapp.com/api-docs

## Pivotal Tracker

URL: https://www.pivotaltracker.com/n/projects/2319773

## Authors

- **Isaiah Ikenna Franklin (Cavdy)**
