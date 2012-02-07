var currentParams = {}


//Picup.convertFileInput($('file_upload_input'), currentParams);	


function viewScratchURL(currentParams){
    alert(currentParams);
    window.open(Picup.urlForOptions('view', currentParams), Picup.windowname);
}
