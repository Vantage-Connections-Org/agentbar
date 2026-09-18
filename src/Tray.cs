using System.IO;
using Forms = System.Windows.Forms;

namespace AgentBar;

/// Tray icon: click to show/hide the bar; right-click for the menu. The tooltip
/// counts chats by state, so the tray alone tells you if anything needs you.
sealed class Tray : IDisposable
{
    readonly Forms.NotifyIcon _icon;

    public Tray(BarWindow bar)
    {
        _icon = new Forms.NotifyIcon { Icon = LoadIcon(), Text = "AgentBar", Visible = true };
        _icon.MouseClick += (_, e) =>
        {
            if (e.Button == Forms.MouseButtons.Left) bar.ToggleVisible();
            else if (e.Button == Forms.MouseButtons.Right) bar.ShowMenuAtCursor(); // same styled menu as the bar
        };
    }

    static System.Drawing.Icon LoadIcon()
    {
        using Stream s = typeof(Tray).Assembly.GetManifestResourceStream("AgentBar.ico");
        return s != null
            ? new System.Drawing.Icon(s, Forms.SystemInformation.SmallIconSize)
            : System.Drawing.Icon.ExtractAssociatedIcon(Environment.ProcessPath);
    }

    public void Update(string summary, bool hidden)
    {
        string text = "AgentBar: " + summary + (hidden ? " (bar hidden)" : "");
        _icon.Text = text.Length > 127 ? text[..127] : text; // Windows limit
    }

    public void Dispose()
    {
        _icon.Visible = false; // otherwise a ghost icon lingers until the tray is hovered
        _icon.Dispose();
    }
}
