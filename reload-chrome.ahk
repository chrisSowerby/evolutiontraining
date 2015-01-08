; script put together by chris sowerby :O woop.
SetTitleMatchMode RegEx				
if WinExist(".*- Google Chrome*") {
	WinActivate
	ControlFocus, Chrome_AutocompleteEditView1
	; Chrome_AutocompleteEditView1 is the name of the omnibar control
	send {f5} 
	;send ^{f5} ; send ctrl + F5
}
else {
	Run "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

WinActivate, .*- Sublime Text* ; make sublime text active. 
ExitApp