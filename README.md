# Centered Audio

Omarchy's audio bar widget with its popup centered on the active display.
It also keeps the local keyboard controls: `q` closes the panel, `gg` and `G`
jump to the first and last selectable rows, and number keys set the focused
volume control directly.

## Install

```sh
omarchy plugin add https://github.com/Kylar514/omaaudio.center.git --enable
```

The plugin declares `omarchy.audio` as its source, so enabling it replaces the
built-in audio widget while preserving Omarchy's existing IPC routes.

## Remove

```sh
omarchy plugin remove omaaudio.center
```

Removing it restores the built-in audio widget.

## Upstream

This plugin is derived from
[`shell/plugins/panels/audio`](https://github.com/omacom/omarchy/tree/quattro/shell/plugins/panels/audio)
on Omarchy's `quattro` branch. The `upstream` branch mirrors that directory;
automated pull requests merge upstream changes into the customized `master`
branch for review.

## License

MIT. See [LICENSE](LICENSE).
