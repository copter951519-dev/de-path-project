{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.nodejs_20
    pkgs.python3
    pkgs.lsof
    pkgs.psmisc
  ];

  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];

  idx.previews = {
    enable = true; 
    previews = {
      web = {
        command = [ "node" "DE-Path/backend/server.mjs" ];
        manager = "web";
        env = { PORT = "3000"; };
      };
    };
  };
}