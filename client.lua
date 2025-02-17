-- Queue all progress tasks to prevent infinite loops and overlap
local queue = {}
local function _internalStart(message, time, cb, focus)
    table.insert(queue, {
        message = message,
        callback = cb,
        focus = focus
    })

    -- Optional focus override. Defaults to true if nil.
    if focus == nil or focus == true then
        SetNuiFocus(true, false)
    end
    
    SendNUIMessage({
        type = "ui",
        display = true,
        time = time,
        message = message
    })
end

exports('startUI', _internalStart)

AddEventHandler('__cfx_export_vorp_progressbar_initiate', function(callback)
    callback(function ()
        local self = {}
        self.start = function(message, time, cb, theme, color, width, focus)
            _internalStart(message, time, cb, focus)
        end
        return self
    end)
end)

-- Support `progressBar` resources `startUI` Export.
AddEventHandler('__cfx_export_progressBars_startUI', function(callback)
    callback(function (time, text)
        _internalStart(text, time, nil, false)
    end)
end)

RegisterNUICallback('ProgressFinished', function(args, nuicb)
    if queue[1].focus ~= false then
        SetNuiFocus(false, false)
    end

    if queue[1].callback then
        queue[1].callback()
    end

    table.remove(queue, 1) -- Remove prog from queue 
    
    nuicb('ok')
end)

RegisterCommand('progress', function(source, args, raw)
    _internalStart("Testing out progress", 5000, nil, false)
end, false)