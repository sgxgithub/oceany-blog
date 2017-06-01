(function ($) {
    // function found in stack overflow
    // insert content into text area at the position of caret
    // ref: http://stackoverflow.com/questions/946534/insert-text-into-textarea-with-jquery/946556#946556
    $.fn.insertAtCaret = function (myValue) {
        return this.each(function (i) {
            if (document.selection) {
                //For browsers like Internet Explorer
                this.focus();
                let sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            }
            else if (this.selectionStart || this.selectionStart == '0') {
                //For browsers like Firefox and Webkit based
                let startPos = this.selectionStart;
                let endPos = this.selectionEnd;
                let scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                this.focus();
                this.selectionStart = startPos + myValue.length;
                this.selectionEnd = startPos + myValue.length;
                this.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        });
    };

    $("#post-img").change(function () {
        let formData = new FormData();
        let postImg = document.getElementById("post-img").files[0];
        formData.append("postImg", postImg);
        $.ajax({
            url: '/publish/uploadImg',
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                $('#post-content').insertAtCaret(res.content);
            },
            error: function (res) {
                alert(res);
            }
        });
    });

    // add line number to textarea
    $('#post-content').numberedtextarea();

    $("#post-file").change(function () {
        let formData = new FormData();
        let postFile = document.getElementById("post-file").files[0];
        formData.append("postFile", postFile);

        $.ajax({
            url: '/publish/uploadPost',
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                $('#post-content').val(res.content);
            },
            error: function (res) {
                alert(res);
            }
        });
    });

    //use ajax to refresh menuIndex
    $("#post-section").change(function () {
        let section = $('#post-section').val();
        let url = `/publish/getMenuIndex/${section}`;

        $.ajax({
            method: "get",
            url: url
        }).done(function (result) {
            //set menuIndex
            $("#menuIndex").html(result);
        });

    });

})(jQuery);