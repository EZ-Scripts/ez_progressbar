# Progressbar RedM
A simple progressbar for RedM. Replaces vorp_progressbar, no need to change any code for vorp_progressbar. Export will work.

## Installation
1. Download the latest release from the releases page.
2. Extract the folder into your resources folder.
3. Add `ensure ez_progressbar` to your server.cfg.

## Usage
You can use either of the exports below to run the skillbar.
```lua
exports['ez_progressbar']:startUI(label, time, cb, focus)

-- or

progressbar = exports.vorp_progressbar:initiate()
focus = true
progressbar.start('Loading...', 20000, function ()
    print('DONE!!!!')
end, 'linear', '#ff0000', '20vw', focus)
-- 'linear', '#ff0000', '20vw' this will be ignored. Does not matter what it is.

--or 

exports['progressBars']:startUI(label, time)
```


