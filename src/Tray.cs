using System.IO;
using Forms = System.Windows.Forms;

namespace AgentBar;

/// Tray icon: click to show/hide the bar; right-click for the menu. The tooltip
/// counts chats by state, so the tray alone tells you if anything needs you.
sealed class Tray : IDisposable
{
    readonly Forms.NotifyIcon _icon;
    readonly Forms.ToolStripMenuItem _toggle, _startup;

    public Tray(BarWindow bar)
    {
        _toggle = new Forms.ToolStripMenuItem("Hide bar", null, (_, _) => bar.ToggleVisible());
        _startup = new Forms.ToolStripMenuItem("Start with Windows", null, (_, _) => BarWindow.SetStartWithWindows(!BarWindow.StartsWithWindows()));
        var menu = new Forms.ContextMenuStrip();
        menu.Items.Add(_toggle);
        menu.Items.Add(_startup);
        menu.Items.Add("Mark all finished as seen", null, (_, _) => bar.MarkAllSeen());
        menu.Items.Add(new Forms.ToolStripSeparator());
        menu.Items.Add("Quit AgentBar", null, (_, _) => bar.Close());
        menu.Opening += (_, _) =>
        {
            _toggle.Text = bar.IsVisible ? "Hide bar" : "Show bar";
            _startup.Checked = BarWindow.StartsWithWindows();
        };

        _icon = new Forms.NotifyIcon { Icon = LoadIcon(), Text = "AgentBar", ContextMenuStrip = menu, Visible = true };
        _icon.MouseClick += (_, e) => { if (e.Button == Forms.MouseButtons.Left) bar.ToggleVisible(); };
    }

    static System.Drawing.Icon LoadIcon()
    {
        using Stream s = typeof(Tray).Assembly.GetManifestResourceStream("AgentBar.ico");
        return s != null
            ? new System.Drawing.Icon(s, Forms.SystemInformation.SmallIconSize)
            : System.Drawing.Icon.ExtractAssociatedIcon(Environment.ProcessPath);
    }

    public void Update(int working, int waiting, int total, bool hidden)
    {
        string text = total == 0 ? "AgentBar: no chats"
            : $"AgentBar: {total} chat{(total == 1 ? "" : "s")}" +
              (waiting > 0 ? $", {waiting} done" : "") + (working > 0 ? $", {working} working" : "");
        if (hidden) text += " (bar hidden)";
        _icon.Text = text.Length > 127 ? text[..127] : text; // Windows limit
    }

    public void Dispose()
    {
        _icon.Visible = false; // otherwise a ghost icon lingers until the tray is hovered
        _icon.Dispose();
    }
}
