define [], () ->
    
    class Nave
        row: 0
        col: 0

        width: 43
        height: 39

        pos: {
            x: 0
            y: 0
        }
        
        keys: {
            up: false,
            down: false,
            right: false,
            left: false
        }
        
        constructor: (@context) ->
            @image = new Image
            @image.src = "/nave/app/img/naveSprite.png"

        getRow: () ->
            @row * @width

        getCol: () ->
            @col * @height

        updates: () =>
            @pos.y -= 2 if @keys.up
            @pos.y += 2 if @keys.down
            @pos.x -= 2 if @keys.left
            @pos.x += 2 if @keys.right
            @row = if @row is 2 then 0 else @row + 1

        up: () =>
            @keys.up = !@keys.up
            @col = if @col <= 0 and @keys.up then 0 else @col - 1

        down: () =>
            @keys.down = !@keys.down
            @col = if @col >= 2 and @keys.down then 2 else @col + 1

        left: () =>
            @keys.left = !@keys.left

        right: () =>
            @keys.right = !@keys.right