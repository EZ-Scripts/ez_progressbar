fx_version "adamant"
game "common"
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
name "ez_progressbar"
author "Rayaan Uddin"
description "A progress bar for fivem and redm servers"

files {
	'html/*',
    'html/fonts/*'
}

ui_page 'html/index.html'

client_script {
	'client.lua'
}