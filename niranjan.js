var T = (function () {
  var TagStore = function() {
    this.tags = [];
    this.display = true;

    this.makeTag = function (name, xPercent, yPercent) {
      this.tags.push(
        {
          name: name,
          xPercent: xPercent,
          yPercent: yPercent
        }
      );
    };

    this.grabTags = function () {
      return this.tags;
    };

    this.toggleTags = function () {
      if(this.display) {
        this.showTags();
      } else {
        this.hideTags();
      }
    };

    this.hideTags = function () {
      $("#tags").empty();
      this.display = true;
    };

    this.showTags = function () {
      var tags = this.grabTags();

      $(tags).each(function(){
        var tag = $("<div></div>")
                      .addClass("tag")
                      .css({"top": this.yPercent, "left": this.xPercent});

        var title = $("<div>" + this.name + "</div>")
                      .addClass("title");

        tag.append(title);
        $("#tags").append(tag);
      });

      this.display = false;
    };
  };


  var UserStore = function (tagStore) {
    this.users = [];
    this.tagStore = tagStore;

    this.makeUser = function(name) {
      this.users.push(name);
    };

    this.seed = function() {
      this.makeUser("Niranjan");
      this.makeUser("Sarah");
      this.makeUser("Ned");
      this.makeUser("Jonathan");
      this.makeUser("Kush");
      this.makeUser("Kenny");
      this.makeUser("Adam");
      this.makeUser("Jordan");
      this.makeUser("Mario");
      this.makeUser("Kriti");
      this.makeUser("Shaun");
      this.makeUser("Sean");
      this.makeUser("ExtraSpecialAdam");
    };

    this.getUsers = function() {
      return this.users;
    };

    this.returnUsersAsHtml = function() {
      var that = this;

      var nameList = $("<div></div>").addClass("nameList").addClass("cf");

      $(this.getUsers()).each(function() {
        var name = $("<div>" + this + "</div>").addClass("name");
        nameList.append(name);
      });

      nameList.on("click", ".name", function() {
        var xPercent = $(".selectionContainer").css("left");
        var yPercent = $(".selectionContainer").css("top");
        that.tagStore.makeTag($(this).text(), xPercent, yPercent);
        console.log(that.tagStore.tags);
        $("#selection").empty();
        // to stop click from propogating
        return false;
      });

      return nameList;
    };
  };


  var HandleClick = function(element, userStore){
    this.canvas = $(element);
    this.userStore = userStore;

    this.setUp = function() {
      this.userStore.seed();
      $(this.canvas).click(this.click.bind(this));
    };

    this.click = function(event) {
      var canvasWidth = this.canvas.width();
      var canvasHeight = this.canvas.height();
      var canvasXpos = (.1 * $(document).width()); // Dependent on the fact
      // that the canvas is 80% of the document width;
      var canvasYpos = this.canvas.position().top + 5;
      console.log(canvasYpos);
      var xpos = event.pageX;
      var ypos = event.pageY;
      console.log(xpos);

      var xPercent = Math.floor(((xpos - canvasXpos) / canvasWidth) * 100) - 6;
      var yPercent = Math.floor(((ypos - canvasYpos) / canvasHeight) * 100) - 7;

      this.makePreTag(xPercent, yPercent);
    };

    this.makePreTag = function(xPercent, yPercent) {
      $("#selection").empty();
      this.userStore.tagStore.hideTags();

      var container = $("<div></div")
          .addClass("selectionContainer")
          .addClass("cf")
          .css("left", (xPercent + "%"))
          .css("top", (yPercent + "%"));

      container.append(
        $("<div></div>")
          .addClass("preTag")
      );

      container.mouseleave(function() {
        $("#selection").empty();
      });

      container.append(this.userStore.returnUsersAsHtml());
      $("#selection").append(container);
    };
  };

  return {
    HandleClick: HandleClick,
    TagStore: TagStore,
    UserStore: UserStore
  };
})();

$(function () {
  var canvases = $("#canvas");
  var tagStore = new T.TagStore();

  canvases.each(function() {
    console.log(this);
    var x = new T.HandleClick(this, new T.UserStore(tagStore));
    var y = new T.TagStore;
    console.log(x);
    x.setUp();
  });

  $("#toggler").click(function() {
    tagStore.toggleTags();
  });
});