<script>
  export let openList;
  let num = 0;

  let num1 = ++num;

  

  function removeItem(id) {
    openList = openList.filter(function (item) {
      return item.id !== id;
    });
  }
</script>


