<?php
function htmlout($text) {
    return htmlentities(utf8_encode($text));
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Custom Url Input</title>
        <link type="text/css" href="css/template.css"  rel="stylesheet" />
        <script type="text/javascript" src="../src/url-input.js"></script>
    </head>
    <body>
        <form method="POST" name="social_links">
            <h3>Social Links</h3>
            
            <div class="form-widget">
                <label>Twitter Url:</label>
                <input type="url" name="social_links[twitter]" class="twitter-url" value="<?php echo htmlout(@$_POST['social_links']['twitter']); ?>" />
            </div>
            
            <div class="form-widget">
                <label>Facebook Url:</label>
                <input type="url" name="social_links[facebook]" class="facebook-url" value="<?php echo htmlout(@$_POST['social_links']['facebook']); ?>" />
            </div>
            
            <div class="form-widget">
                <label>Custom Url:</label>
                <input type="url" name="social_links[custom]" class="globe-url" value="<?php echo htmlout(@$_POST['social_links']['custom']); ?>" />
            </div>
            
            <div>
                <input type="submit" value="Save" />
            </div>
        </form>
    </body>
</html>