USER
| ID | name | image | email | password | totp | date | $ |
|:--:|:----:|:-----:|:-----:|:--------:|:----:|:----:|:-:|
| auto-generated | { first, last } | { ID, url } | string | string | string | { create, update } | { version: **1**, partition } |

USER_SESSION
| ID | user | agent | date | $ |
|:--:|:----:|:-----:|:----:|:-:|
| auto-generated | USER.ID | string | { create, active } | { version: **1**, partition } |
