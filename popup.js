// Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = "1096340861657-c0596rq0b2d1erfc99bo272m2p76gd1k.apps.googleusercontent.com";
      var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
      var API_KEY = "AIzaSyA3yJ67-xkarYLSZjApx31RcvQjQydibeY";
      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com

      var SCOPES = ['https://www.googleapis.com/auth/drive'];
      
      window.onload = function(e){
        console.log("Loading Workflow structure JSON");
        $.getJSON(chrome.extension.getURL('workflowstructure.json'), function(settings) {
          //..
        });
        };
      
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
          switchPageLoader(false);
          authorizeDiv.style.display = 'inline';
          loadDOMListners();
          console.log("Authentication Failed");
        }
      }

      function switchPageLoader(switchr) {
        var bble = document.getElementById('pageloading');
        if (switchr === false) {
        bble.style.display = 'none';
        } else {
          bble.style.span.display = 'inline';
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
        var request = gapi.client.drive.children.list({
            'folderId': "0B8c_I3daa9Dxc1VicVhXUm5BcEk",
            'maxResults': 100
          });

          request.execute(function(resp) {

            var folders = resp.items;
            if (folders && folders.length > 0) {
              var dl = document.getElementById('projectDL');
              var slctor = document.createElement("SELECT");
              var lblhead = document.createTextNode("Select Existing Project:");
              dl.appendChild(lblhead);
              dl.appendChild(slctor);
              for (var i = 0; i < folders.length; i++) {
                var folder = folders[i];
                appendPre(folder.name + ' (' + folder.id + ')',slctor);
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
      function appendPre(message,slctr) {
        console.log("Adding element: " + message);
        var optn = document.createElement("OPTION");
        switchPageLoader(false);
        var msg = document.createTextNode(message);
        optn.appendChild(msg);
        slctr.appendChild(optn);

      }
      
      function loadWorkFlow() {
      }
