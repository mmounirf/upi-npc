upi_npc.controller('CreatePostCtrl', function($scope, $ionicLoading, $ionicPopup, $ionicModal, $http, $state, $ionicHistory, AuthService, PostService) {
const WORDPRESS_API_URL = 'http://upi-npc.com/api/';
var user_id = JSON.parse(window.localStorage.ionWordpress_user).user_id
var username = JSON.parse(window.localStorage.ionWordpress_user).data.username

$scope.post = {};
$scope.uni_cat_name;
get_user_uni_name(user_id);

function get_user_uni_name(id){
  $ionicLoading.show({
    template: '<ion-spinner></ion-spinner>'
  });
  $http.jsonp(WORDPRESS_API_URL +
    'user/xprofile/' +
    '?user_id='+ id +
    '&insecure=cool' +
    '&field=university' +
    '&callback=JSON_CALLBACK')
    .success(function(data) {
      console.log(data)
      $ionicLoading.hide();
      if(data.status == 'ok'){
        $scope.uni_cat_name = data.university;
        $http.get('http://upi-npc.com/wp-json/mmounirf/v1/get-uni-cats')
          .success(function(data) {
            for(var i=0; i<data.length; i++){
              if(data[i].cat_name == $scope.uni_cat_name){
                $scope.user_uni_cat = data[i];
              }
            }
          });
      }else{
        $ionicPopup.alert({
         title: 'خطأ',
         template: 'تعذر الحصول علي بعد البيانات برجاء المحاولة مره آخري'
       });
      }
    });
}




function get_cats(){
  $ionicLoading.show({
    template: '<ion-spinner></ion-spinner>'
  });
  $http.get('http://upi-npc.com/wp-json/mmounirf/v1/get-cats')
    .success(function(data) {
      $ionicLoading.hide();
      $scope.cats = data;

      $scope.parentCatsIDs = [];
      $scope.parentCats = [];
      for(var i=0; i<$scope.cats.length; i++){

        if($scope.cats[i].parent != 0){
          $scope.parentCatsIDs.push($scope.cats[i].parent);
          $scope.parentCatsIDs = _.uniq($scope.parentCatsIDs);
        }

        /*Ugly fix for Categories with no childs*/
        $scope.parentCatsIDs.push(105);
      }

    })
    .error(function(error){
      $ionicLoading.hide();
      $ionicPopup.alert({
       title: 'خطأ',
       template: 'تعذر الحصول علي بعد البيانات برجاء المحاولة مره آخري'
     });
    });

}

$scope.selectedCats = [];

$scope.selectCats = function(cats){
console.log($scope.selectedCats)
  $ionicModal.fromTemplateUrl('views/app/wordpress/categories_filter.html', {
  scope: $scope,
  animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;

    if(cats.length==0){
      get_cats();

    }

    $scope.modal.show();
  });
}



$scope.selectCat = function(cat){
    if(_.contains($scope.selectedCats, cat)){
      $scope.selectedCats.splice($scope.selectedCats.indexOf(cat), 1);
    }else{
      if($scope.selectedCats.length >= 2){
        $ionicPopup.alert({
         title: 'خطأ',
         template: 'لا يمكنك اختيار اكثر من تصنفين للمقال'
       });
     }else{
       $scope.selectedCats.push(cat);
     }

    }
}

$scope.isParent = function(parents, id){
  return _.contains(parents, id);
}


$scope.applySelectedCats = function(selectedCats){
  $scope.modal.hide();
}


$scope.isCatSelected = function(cat){
  return _.contains($scope.selectedCats, cat)
}




$scope.publishPost = function(post){
  $ionicLoading.show({
    template: '<ion-spinner></ion-spinner> جاري إرسال المقالة'
  });

  $scope.post_cats = [];
  $scope.post_cats.push($scope.user_uni_cat);
  $scope.post_cats.push($scope.selectedCats);
  $scope.post_cats = _.flatten($scope.post_cats);
  $scope.post_cats_slugs = _.map($scope.post_cats, function(cat){ return cat.slug; });

  $scope.cats_list = $scope.post_cats_slugs.join(",");

  var status = 'publish';
  var user = JSON.parse(window.localStorage.ionWordpress_user);
  if(user.data.capabilities.snax_author){
    status = 'pending'
  }


// PostService.createPost(post_data, cookie).then(function(response){
//     console.log(response)
//     },function(err){
//       console.log(err)
//     });
// }
var username = user.data.username;

var post_data = {
  'title': post.title,
  'content': post.content,
  'author': username,
  'status': status,
  'categories': $scope.cats_list
}
PostService.createPost(post_data)
.then(function(response){
  console.log(response)
$ionicLoading.hide();
if(post.status == "pending"){
  $ionicPopup.alert({
   title: 'المقالة قيد المراجعة',
   template: 'تم ارسال المقالة بنجاح، و هي الآن قيد المراجعة'
 }).then(function(res) {
   $ionicHistory.nextViewOptions({
    disableBack: true,
    historyRoot: false
  });
   $state.go('app.home');
  });


}else{
  $ionicPopup.alert({
   title: 'تم نشر المقالة',
   template: 'شكراً لك. تم نشر المقالة بنجاح'
 }).then(function(res) {
   $ionicHistory.nextViewOptions({
    disableBack: true,
    historyRoot: false
  });
   $state.go('app.home');
   });


}
});

}

});
