// CATEGORIES MENU
upi_npc.controller('PushMenuCtrl', function($scope, Categories) {

  var getItems = function(parents, categories){

    if(parents.length > 0){

      _.each(parents, function(parent){
        parent.name = parent.title;
        parent.link = parent.slug;

        var items = _.filter(categories, function(category){ return category.parent===parent.id; });

        if(items.length > 0){
          parent.menu = {
            title: parent.title,
            id: parent.id,
            items:items
          };
          getItems(parent.menu.items, categories);
        }
      });
    }
    return parents;
  };

  Categories.getCategories()
  .then(function(data){
    var sorted_categories = _.sortBy(data.categories, function(category){ return category.title; });
    var parents = _.filter(sorted_categories, function(category){ return category.parent===0; });
    var result = getItems(parents, sorted_categories);

    $scope.menu = {
      title: 'جميع التصنيفات',
      id: '0',
      items: result
    };
  });
});
