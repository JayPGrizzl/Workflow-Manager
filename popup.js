// Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = "1096340861657-c0596rq0b2d1erfc99bo272m2p76gd1k.apps.googleusercontent.com";
      var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
      var API_KEY = "AIzaSyA3yJ67-xkarYLSZjApx31RcvQjQydibeY";
      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com

      var SCOPES = ['https://www.googleapis.com/auth/drive'];
      

       function handleClientLoad() {
          //gapi.client.setApiKey(APIKEY);
          window.setTimeout(callinit,1);
      }
      
      function callinit() {
        gapi.auth.init(checkAuth);
        console.log("Auth Initilized");
      }
      
      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        console.log("Preparing to run OAuth2.0 authorization");
        gapi.auth.authorize(
          {
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        console.log("Preparing to Handle OAuth 2.0 Result");
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          console.log("Authentication Succeeded");
          authorizeDiv.style.display = 'none';
          loadDriveApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
          loadDOMListners();
          console.log("Authentication Failed");
        }
      }

      function loadDOMListners() { 
        console.log("Auth Button Enabled");
        document.getElementById('authorize-button').onmousedown = function() {
          handleAuthClick(event);
        console.log("Auth Button Clicked");
        };
       }
       

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        console.log("Preparing to run OAuth2.0 authorization from click");
        gapi.auth.authorize(
          {client_id: CLIENT_ID,
          scope: SCOPES,
          immediate: false
          }, handleAuthResult);
        return false;
      }

      /**
       * Load Drive API client library.
       */
      function loadDriveApi() {
        console.log("Loading Drive API");
        gapi.client.load('drive', 'v2', listFiles);
      }

      /**
       * Print files.
       */
      function listFiles() {
        console.log("Activating Drive Files List");
        var request = gapi.client.drive.files.list({
            'maxResults': 10
          });

          request.execute(function(resp) {
            appendPre('Files:');
            var files = resp.items;
            if (files && files.length > 0) {
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.title + ' (' + file.id + ')');
              }
            } else {
              appendPre('No files found.');
            }
          });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
