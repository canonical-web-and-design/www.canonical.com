# Canonical cookie policy component

This project contains the JavaScript and styles to display a cookie policy on a
page.

## Usage

Currently there is no deployment system for this project as its under
development. Once the project hits v1 this message will be replaced with some
links to the latest versions of the JS and CSS.

### Options
You can configure the cookie policy with the following options.

#### Message:
You can edit to cookie policy message by passing the setup function an options
object with a content value. For example:

``` javascript
var options = {
  'content': 'We use cookies to improve your experience.'
}
```

#### Timed destruction
You can make the cookie policy self distruct in time but passing a duration as
an option. Duration is measured in milliseconds.

``` javascript
var options = {
  'duration': 3000
}
```

Note: It is recommended you add a link to your cookie policy in the footer of
your wesbite when using this option.


#### Full example

``` javascript
var options = {
  'content': 'We use cookies to improve your experience. By your continued use of this site you accept such use.<br /> This notice will disappear by itself. To change your settings please <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">see our policy</a>.',
  'duration': 3000
}
ubuntu.cookiePolicy.setup(options);
```

## Contributing

If you would like to help improve this project, here is a list of commands to
help you get started.

### Building the Global nav

To build the JS and CSS into the build folder, run:

```
gulp build
```

You can view the build files in action by opening the `index.html` in the root
of this project.

### Hacking

When developing this project you can run the following command to listen to
changes in the `src/js/*js` and `src/sass/*scss` and builds them into the
`/build` folder.

```
gulp dev
```

Before submitting your pull request. Run the lint, which checks both the JS
and Sass for errors.

```
gulp test
```

Code licensed LGPLv3 by Canonical Ltd.

With ♥ from Canonical
