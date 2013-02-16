var SS = (function () {
  function Secret(id, text) {
    var that = this;

    this.id = id;
    this.text = text;

    this.save = function (callback) {
      $.post("/secrets.json", {
        secret: {
          id: this.id,
          text: this.text
        }
      }, function (response) {
        that.id = response.id;

        if (callback) {
          callback();
        }
      });
    }
  };

  Secret.all = [];
  Secret.fetchAll = function (callback) {
    $.getJSON(
      "/secrets.json",
      function (data) {
        Secret.all = [];
        _.each(data, function (datum) {
          Secret.all.push(new Secret(
            datum.id, datum.text));
        });

        if (callback) {
          callback();
        }
      }
    );
  };

  function SecretsLister(el, secrets) {
    this.render = function () {
      var ul = $("<ul></ul");
      _.each(secrets, function (secret) {
        ul.append($("<li></li>").text(secret.text));
      });

      $(el).html(ul);
    };
  };

  return {
    Secret: Secret,
    SecretsLister: SecretsLister
  };
})();