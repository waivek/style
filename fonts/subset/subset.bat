@echo off
rem pyftsubset confluence_c3_bold.woff --text-file=confluence_c3_bold_characters.txt --flavor=woff

pyftsubset confluence_c3_regular.woff --text-file=confluence_c3_regular_characters.txt --flavor=woff2
pyftsubset confluence_c3_regular.woff --text-file=confluence_c3_regular_subset.txt --flavor=woff

rem pyftsubset fairplay_text_a_bold.woff --text-file=fairplay_text_a_bold_characters.txt --flavor=woff
rem pyftsubset fairplay_text_a_italic.woff --text-file=fairplay_text_a_italic_characters.txt --flavor=woff
rem pyftsubset fairplay_text_a_regular.woff --text-file=fairplay_text_a_regular_characters.txt --flavor=woff