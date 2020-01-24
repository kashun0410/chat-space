$(function(){
  var buildHTML = function(message) {
  var uppermessage = `<div class="message" data-message-id=` + message.id + `>` +
                  `<div class="message__upper-info">` +
                    `<p class="message__upper-info__user-name">` + 
                      message.user_name + 
                    `</p>` +
                    `<p class="message__upper-info__date">` +
                      message.created_at +
                    `</p>` +
                  `</div>` 

  if (message.content && message.image) {
    var html = uppermessage +
        `<p class="message__text">` +
          `<p class="message__text__content">` +
            message.content +
          `</p>` +
        `<img src="` + message.image + `" class="lower-message__image" >` +
      `</div>` +
    `</div>`
  } else if (message.content) {
    var html = uppermessage +
      `<p class="message__text">` +
        `<p class="message__text__content">` +
          message.content +
        `</p>` +
      `</p>` +
    `</div>`
  } else if (message.image) {
    var html = uppermessage +
      `<p class="message__text">` +
        `<img src="` + message.image + `" class="lower-message__image" >` +
      `</p>` +
    `</div>`
  };
  return html;
};

 $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
   .done(function(data){
     var html = buildHTML(data);
     $('.chat-main__message-list').append(html);
     $('form')[0].reset();
     $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight });
   })
   .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form-submit').prop('disabled', false);
    });
  })
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
         insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("error");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});