**USER:**
| id | name | image | email | password | totp | timestamp | $ |
|:--:|:----:|:-----:|:-----:|:--------:|:----:|:---------:|:-:|
| auto-generated | { first, last } | { url } | string | string | string | { create, update } | { version: **1**, partition: **1 to 100** } |

<br/>

**USER_SESSION:**
| id | user | device | location | status | timestamp | $ |
|:--:|:----:|:-----:|:--------:|:------:|:---------:|:-:|
| auto-generated | USER.ID | { userAgent } | TBD | string | { create, login, logout, lastActive } | { version: **1** } |

- status:
  - active → loggedin → loggedout
  - active → expired, blocked
  - loggedin → expired, blocked
