#!/bin/sh
# usage: labels.sh PID...  ->  "pid<TAB>Label" (window class) or "pid<TAB>+dir" (cwd) per PID.
# Walks up each PID's parents to the process owning a Hyprland window. Silent on any failure.
win=$(hyprctl clients -j 2>/dev/null | jq -r '.[] | "\(.pid)\t\(.class)"' 2>/dev/null)
for pid in "$@"; do
  a=$pid
  found=
  while [ "${a:-0}" -gt 1 ] 2>/dev/null; do
    cls=$(printf '%s\n' "$win" | awk -F'\t' -v a="$a" '$1==a{print $2}' | sort -u)
    if [ -n "$cls" ]; then
      found=1
      # one window, and not a browser app-id like brave-foo-Default
      case "$cls" in
        *"
"*|*-Default) ;;
        *) printf '%s\t%s\n' "$pid" "$(printf '%s' "$cls" | sed 's/[-_]/ /g' | awk '{for(i=1;i<=NF;i++)$i=toupper(substr($i,1,1)) substr($i,2)}1')" ;;
      esac
      break
    fi
    a=$(awk '/^PPid:/{print $2}' "/proc/$a/status" 2>/dev/null)
  done
  if [ -z "$found" ]; then
    d=$(readlink "/proc/$pid/cwd" 2>/dev/null)
    case "$d" in ""|/|"$HOME") ;; *) printf '%s\t+%s\n' "$pid" "${d##*/}" ;; esac
  fi
done
