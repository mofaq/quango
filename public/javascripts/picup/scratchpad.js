var currentParams = {}


//Picup.convertFileInput($('file_upload_input'), currentParams);	


function viewScratchURL(callbackURL){
    //alert(callbackURL);
    window.open(Picup.urlForOptions('new', {'callbackURL':escape(callbackURL)}), Picup.windowname);
}
