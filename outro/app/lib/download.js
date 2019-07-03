// DOWNLOAD SINGLE FILE

    var download = {};
    download.downloadOneFile = function(url, img_view, localFilepath, callBack_DownloadOneFileFinished) {
        if (Titanium.Network.online) {
            var c = Titanium.Network.createHTTPClient();
            if (null != callBack_DownloadOneFileFinished) {
                c.onerror = function(e) {
                    Ti.API.info('MyApp: Download failed: url= ' + url + ' Error=' + e.error);
                    callBack_DownloadOneFileFinished({
                        status : e.error,
                        path : ''
                    });

                    // CLOSE AN ANIMATION HERE AFTER DOWNLOAD

                };
                

                c.onload = function(e) {
                    if(Titanium.Platform.name === 'android') {
                        // On android HTTPClient will not save the file to disk. So have to hack around it
                        console.log('-- downloadImages() - SINGLE STARTED: ' + localFilepath);
                        var f = Titanium.Filesystem.getFile(localFilepath);
                        f.write(c.responseData);
                    }
                    callBack_DownloadOneFileFinished({
                        status : c.status,
                        path : localFilepath,
                        img_view : img_view
                    });

                    // OPEN AN ANIMATION HERE

                };
            }
            c.open('GET', url);

            if (null != localFilepath && Titanium.Platform.name !== 'android') {
                console.log('-- downloadImages() - SINGLE STARTED: ' + localFilepath);
                c.file = Titanium.Filesystem.getFile(localFilepath);
            }
            c.send();
        } else {
            
                var alerts = require('alerts');
                alerts.show(L('alert_internet', "Please check your internet connection."));
                alerts = null;
        }
    };



// DOWNLOAD MULTIPLE FILES

    download.downloadMultiFile = function(downloadQueue, callBack_DownloadOneFileFinished, callBack_DownloadMultipleFileFinished) {
        
        if (Titanium.Network.online) {
            var queueIndex = 0;

            var processQueue = function(download_result) {
                if (typeof (download_result) !== 'undefined') {
                    callBack_DownloadOneFileFinished(download_result);
                }

                if (queueIndex < downloadQueue.length) {

                    // download
                        utility.downloadOneFile(downloadQueue[queueIndex].url, downloadQueue[queueIndex].filepath, processQueue);
                        queueIndex++;
                } else {
                    callBack_DownloadMultipleFileFinished();
                }
            };
            processQueue();
        } else {
            
                var alerts = require('alerts');
                alerts.show(L('alert_internet', "Please check your internet connection."));
                alerts = null;
        }
    };
    exports.download = download;