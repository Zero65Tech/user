USER
| id | name | image | email | password | totp | timestamp | $ |
|:--:|:----:|:-----:|:-----:|:--------:|:----:|:---------:|:-:|
| auto-generated | { first, last } | { ID, url } | string | string | string | { create, update } | { version: **1**, partition: **1 to 100** } |

USER_SESSION
| id | user | agent | timestamp | $ |
|:--:|:----:|:-----:|:---------:|:-:|
| auto-generated | USER.ID | string | { create, active } | { version: **1** } |
