.PHONY: release
release:
	yarn gitmoji-changelog
	git stash
	yarn lerna version --no-push
	git stash pop stash@{0}
	git add CHANGELOG.md
	git commit --amend
	git push
