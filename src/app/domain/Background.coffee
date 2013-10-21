define [], () ->

    class Background
        pos: {
            x: 0
        }

        constructor: (imageName, @speedy) ->
            @image = new Image
            @image.src = "/src/app/img/#{imageName}.png"

        updates: () =>
            @pos.x -= if (Math.abs @pos.x) >= @image.width then @speedy else 0