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
        # ย้ายมาใช้เลขพอร์ต 9001 และสั่งให้มันทำงานอัตโนมัติ
        command = [ "node" "DE-Path-Project/backend/server.mjs" ];
        manager = "web";
      };
    };
  };
}