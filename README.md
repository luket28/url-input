Custom Url Input
================


1) Project Description
--------------------------------------

A little jquery component that hides http:// and https:// for url inputs.

To start with this is a really simple component. Essentially any inputs of type url will be hidden and 
their class & style attributes coppied into a fake input which will be shown in their place. If the fake 
input is edited then the original input will be updated. On blur, the http(s):// will be removed for the 
fake input's value if it's a valid url.


If there's a need for it, I can add in an option to make this more complicated using:

a) moagrius' approach to copying element style rules
http://upshots.org/javascript/jquery-copy-style-copycss

b) bognoko's approach to creating dynamic css rules
http://stackoverflow.com/questions/1212500/create-a-css-rule-class-with-jquery-at-runtime

c) esmiralha's simple hashing code to keep track of the auto-generated css rules
http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery

This would have the advantage of leaving ids, names and classes free for use with jQuery at the expense of
performance.



2) Project Dependencies
--------------------------------------

1. jQuery (developed using v11.1)
