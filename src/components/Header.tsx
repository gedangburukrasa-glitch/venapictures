@@ .. @@
     const onNotificationClick = (notification: Notification) => {
-        if (notification.link) {
-            handleNavigation(notification.link.view, notification.link.action, notification.id);
+        if (notification.linkView) {
+            handleNavigation(notification.linkView, notification.linkAction, notification.id);
         }
         setIsNotifOpen(false);
     };