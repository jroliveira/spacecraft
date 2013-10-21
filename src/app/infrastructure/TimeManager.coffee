define [], () ->

    class TimeManager
        constructor: () ->
            last = new Date().getTime()
            current = new Date().getTime()

        canUpdate: () =>
            if (@current - @last) < 201
                false
            else
                @last = @current
                true

        now: () =>
            @current = new Date().getTime()