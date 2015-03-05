Upgrade Guide
=============

0.1.0 -> 0.2.0
------------------

### Rename `methods` to `endpoints`

The `methods` property of an API Resource was renamed to `endpoints` to reduce confusion with `method`, which is a string containing the HTTP method to be used for the request. Update any references to `methods` in your lively config files.


```js
// 0.1.0 API Resource configuration
{
    name      : 'Activity',
    slug      : 'activity',
    synopsis  : 'This is a read-only API to the GitHub events.',
    methods   : [
        {...},
        {...}
    ],
    resources : [
        {...},
        {...}
    ]
}
```

```js
// 0.2.0 API Resource configuration
{
    name      : 'Activity',
    slug      : 'activity',
    synopsis  : 'This is a read-only API to the GitHub events.',
    endpoints : [
        {...},
        {...}
    ],
    resources : [
        {...},
        {...}
    ]
}
```
