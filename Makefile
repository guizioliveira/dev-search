GREP=grep
CURL=curl

README_TMP=readme.html
USER=guizioliveira
REPO=dev-search

.PHONY: purge

purge:
	$(CURL) -s https://github.com/$(USER)/$(REPO)/blob/main/README.md > $(README_TMP)
	$(GREP) -Eo '<img src="[^"]+"' $(README_TMP) | $(GREP) camo | $(GREP) -Eo 'https[^"]+' | xargs -I {} $(CURL) -w "\n" -s -X PURGE {}
