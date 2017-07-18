
commentFormLock = false;
commentLock = false;
showAll = false;

$(function () {

    initCommentForm();

    $('body').on('click', '[data-action="like"]', function() {

        var $counter = $(this).find('.count');

        if (commentLock == true) {
            return false;
        }

        commentLock = true;

        id = $(this).attr('data-id');

        $.ajax({
            type: 'get',
            url: '/item/like?id=' + id,
            format: 'json',
            success: function(response) {
                if (response.status == 'success') {
                    $counter.text(response.numLikes);
                }
                commentLock = false;
            }
        });
    });

    $form = $("#comment-form");
    $reset = $form.find("button[type='reset']");

    $('body').on('click', '[data-action="answer"]', function() {
        var id_parent = $(this).attr('data-id');

        $parent = $(this).closest('.comment');

        $(this).closest('.comment__actions').hide();

        $form[0].reset();

        $('#comment-parent_id').val(id_parent);
        $form.appendTo($parent);
        $reset.show();
        return false;
    });

    $('body').on('click', '[data-action="show-all"]', function() {
        showAll = true;
        $('.hidden-comment').show();
        $('[data-action="show-all"]').hide();
    })

    $('body').on('click', '[data-action="complaint"]', function() {
        var id = $(this).attr('data-id');
        var $this = $(this);
        $.ajax({
            type: 'get',
            url: '/item/complaint/?id=' + id,
            format: 'json',
            success: function(response) {
                if (response.status == 'success') {
                    $this.replaceWith('Жалоба принята!');
                } else {
                    $this.replaceWith('Сервер перегружен!');
                }
            }
        });

        return false;
    });

    $reset.click(function() {
        $reset.hide();
        $form[0].reset();
        $('#comment-type').val(materialType);
        $('#comment-id_item').val(materialId);
        $(this).closest('.comment').find('.comment__actions').show();
        $form.appendTo(".form-wrapper");
    });
});

function initCommentForm() {

    $('#comment-form').on('beforeSubmit', function() {
        if (commentFormLock == true) {
            return false;
        }

        commentFormLock = true;

        var data = $(this).serialize();
        var url = $(this).attr('action');
        $(this)[0].reset();
        _showAll = showAll;
        $.ajax({
            type: 'POST',
            data: data,
            url: url,
            format: 'json',
            success: function(response) {
                $form.appendTo(".form-wrapper");
                $("[data-type='total-comments-count']").text(response.count);
                commentFormLock = false;
                $.pjax.reload({container:"#comments2"});
                console.log(_showAll);
                if (_showAll == true) {
                    $('.hidden-comment').show();
                    $('[data-action="show-all"]').hide();
                }
                return false;
            }
        });
        return false;
    });
}
