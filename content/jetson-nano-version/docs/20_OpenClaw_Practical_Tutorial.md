# 20. OpenClaw Practical Tutorial

> [!NOTE]
>
> **The robot is shipped with OpenClaw and related packages pre-configured. For the first use, follow Section 20.1 Preparation to import and build. If errors or compatibility issues occur later when running the tutorials, re-import the provided backup resource files and skills to the corresponding paths according to Section 20.1 Preparation and rebuild. After a successful build, proceed with the application tutorials.**

<p id ="anther20.1"></p>

## 20.1 Preparation

### 20.1.1 Host Board Resource Deployment and Environment Compilation

Before running any application, move the OpenClaw resource files to the corresponding folders.

1. First, use NoMachine to remotely connect to the robot and enter the system desktop.
2. Drag the **openclaw_resource.zip** file from the **[Robot](https://drive.google.com/drive/folders/1dNk_EAtdBSi356J4gOvWVr8_1iJmMIQr?usp=sharing)** folder in the OpenClaw resource files to the desktop.

<img src="../_static/media/chapter_21/section_1/image31.png" class="common_img" style="width:900px;"/>

3. Click the folder icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image67.png" class="common_img inline-icon"/> to open the file manager. Move the imported package to the shared path **"~/docker/tmp"**.

<img src="../_static/media/chapter_21/section_1/image68.png" class="common_img" style="width:800px;"/>

4. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal.

5. Enter the command to extract the file to the corresponding path.

```
unzip ~/share/tmp/openclaw_resource.zip -d .
```

6. Enter the command to enter the folder.

```
cd openclaw_resource
```

7. Then enter the command to execute the script.

```
zsh deploy.sh package
```

8. In the subsequent options, enter **y** repeatedly.

<img src="../_static/media/chapter_21/section_1/image32.png" class="common_img" style="width:800px;"/>

9. After running the script, the previous **IDENTITY.md** and three skill backups are saved in the **backup.20260409_092420** folder. use the `ls` command to view them.

10. Then enter the command in the terminal to enter the workspace and build the **openclaw_controller** package.

```
cd ~/ros2_ws/ && colcon build --event-handlers  console_direct+  --cmake-args  -DCMAKE_BUILD_TYPE=Release --symlink-install --packages-select openclaw_controller
```

11. After the build is complete, enter the command to refresh the environment variables.

```
source ~/.zshrc
```

### 20.1.2 Virtual Machine Development Environment Setup

**Virtual Machine Side Operations:**

 * Check the version of the already installed openclaw.

```bash
openclaw --version
```

<img class="common_img" src="../_static/media/chapter_21/section_2/image1.png" style="width:800px"  />

 * **Import files to the virtual machine**

1. Drag the **openclaw_resource.zip** file from the [**Virtual Machine**](https://drive.google.com/drive/folders/1ID5k8JkhtwIXE4OaOtbKNNYLC9Q48WR5?usp=sharing) folder in the OpenClaw resource folder to the desktop.

2. Click the desktop icon <img class="inline-icon" src="../_static/media/chapter_21/section_2/image15.png"  /> to enter the home directory by default.

<img class="common_img" src="../_static/media/chapter_21/section_2/image16.png" style="width:800px"  />

3. Import the **openclaw_resource.zip** file into the virtual machine by dragging:

<img class="common_img" src="../_static/media/chapter_21/section_2/image17.png" style="width:800px"  />

4. Click the desktop icon <img class="inline-icon" src="../_static/media/chapter_21/section_2/image18.png"  /> to create a new command line terminal.

5. Enter the command to extract **openclaw_resource.zip** to the current home/ubuntu directory:

```
cd openclaw_resource
```

6. Then enter the command to execute the script.

```
zsh deploy_pi.sh
```

7. In the subsequent options, enter **y** repeatedly.

<img class="common_img" src="../_static/media/chapter_21/section_2/image34.png" style="width:900px"  />

8. The previous **IDENTITY.md**, **MEMORY.md**, and three skill backups are saved in **backup.20260429_170952**.

9. Add executable permission to the photo script:

```
chmod +x ~/.openclaw/workspace/skills/ros2-cam-subscribe/scripts/cam_subscribe.sh
```

10. Enter the command to refresh the environment variables.

```
source ~/.bashrc
```

<p id ="anther20.2"></p>

## 20.2 Large Model API-Key Acquisition and Configuration

When using OpenClaw on the robot, first configure the agent model in the Agent. Obtain the large model's API-Key and fill it into the corresponding configuration file.

OpenClaw itself supports multiple large models, such as DeepSeek, MiniMax, Qwen, Google, etc. This tutorial uses OpenAI as an example for configuration. If other large models are chosen, search online to obtain the API-Key of that model and configure it in the file.

### 20.2.1 OpenAI Large Model API-Key Acquisition

> [!NOTE]
>
> **This section requires registration on the official OpenAI website to obtain the large model key.**

1) Copy the URL: [https://platform.openai.com/docs/overview](https://platform.openai.com/docs/overview), open the OpenAI webpage, and click Register in the upper right corner.

<img class="common_img" src="../_static/media/chapter_21/section_4/image1.png" style="width:400px"  />

2) Follow the prompts to register and log in using Google, Microsoft, or Apple accounts.

<img class="common_img" src="../_static/media/chapter_21/section_4/image2.png" style="width:600px" />

3) Click the Settings button, then click **Billing**, and click **Payment methods** to bind a payment method. Recharge to purchase **tokens**.

<img class="common_img" src="../_static/media/chapter_21/section_4/image3.png"  />

<img class="common_img" src="../_static/media/chapter_21/section_4/image4.png" style="width:700px" />

4) After completing the preparations, click **API keys**, click **Create** **secret key**, fill in according to the prompts, and save the key after applying for later use.

<img class="common_img" src="../_static/media/chapter_21/section_4/image5.png"  />

<img class="common_img" src="../_static/media/chapter_21/section_4/image6.png" style="width:700px" />

<img class="common_img" src="../_static/media/chapter_21/section_4/image7.png" style="width:500px" />

5) At this point, the creation and deployment of the large model are complete. This API will be used in subsequent courses.

### 20.2.2 API Key Configuration

* Virtual Machine Side Operations

1. Click the desktop icon <img src="../_static/media/chapter_21/section_2/image18.png" class="common_img inline-icon"/> to open the virtual machine system command line terminal.

2. Then enter the command in the command line terminal to configure OpenClaw.

```bash
openclaw config
```

3. Select **Local** and press **Enter**.

<img src="../_static/media/chapter_21/section_4/image8.png" class="common_img" style="width:800px;" />

4. Configure **model**. Select **model** and press **Enter**.

<img src="../_static/media/chapter_21/section_4/image9.png" class="common_img" style="width:800px;" />

5. Select **OpenAI** and press **Enter**.

<img src="../_static/media/chapter_21/section_4/image10.png" class="common_img" style="width:800px;" />

6. Select **OpenAI API key** and press **Enter**.

<img src="../_static/media/chapter_21/section_4/image11.png" class="common_img" style="width:800px;" />

7. Paste the previously copied Key here.

<img src="../_static/media/chapter_21/section_4/image12.png" class="common_img" style="width:800px;" />

8. Select **openai/gpt-5.4** or another suitable model and press **Enter**.

<img src="../_static/media/chapter_21/section_4/image13.png" class="common_img" style="width:800px;" />

9. The model configuration is now complete.

<img src="../_static/media/chapter_21/section_4/image14.png" class="common_img" style="width:800px;" />

## 20.3 Telegram Application Configuration

### 20.3.1 Configure Telegram

> [!NOTE]
>
> - **Use the Telegram app or the web version for operations. This tutorial uses the web version as an example.**
>- **Make sure there is a Telegram account that can log in normally.**

Telegram web address: [https://web.telegram.org/k/](https://web.telegram.org/k/)

Step 1: Use the app to scan the code or enter the phone number + verification code to log in to Telegram.

<img class="common_img" src="../_static/media/chapter_21/section_3/image1.png" style="width:1000px"  />

Step 2: Search for BotFather in the search bar in the upper left corner of Telegram, and click the account with official verification indicated by a blue checkmark to enter the conversation.

<img class="common_img" src="../_static/media/chapter_21/section_3/image2.png" style="width:500px"  />

Step 3: Enter and send /newbot in the dialog box to create the Bot and obtain the Token.  

> [!NOTE]
>
> - **The username must end with "_bot".**
> - **After entering, a Token will be received. Keep it properly and do not disclose it. It will be needed for configuration in OpenClaw later.**

<img class="common_img" src="../_static/media/chapter_21/section_3/image3.png" style="width:600px"  />

<img class="common_img" src="../_static/media/chapter_21/section_3/image4.png" style="width:600px"  />

### 20.3.2  Connecting OpenClaw to the Telegram Plugin

After Telegram preparation is complete, return to the virtual machine to configure OpenClaw.

Step 1: Modify OpenClaw's running configuration (config) to enable the Telegram plugin

```bash
openclaw config set channels.telegram.enabled true
```

<img class="common_img" src="../_static/media/chapter_21/section_3/image5.png" style="width:1000px"  />

Step 2: Write the Telegram bot Token into the OpenClaw configuration

```powershell
openclaw config set channels.telegram.botToken "the TOKEN"
```

<img class="common_img" src="../_static/media/chapter_21/section_3/image6.png" style="width:1000px"  />

Step 3: Start the OpenClaw gateway service

```bash
openclaw gateway
```
<img src="../_static/media/chapter_21/section_3/image10.png" style="width:700px" class="common_img" />

Step 4: In the BotFather chat mentioned above, click the position shown in the figure to open the Bot dialog box, and click the **START** button.

> [!NOTE]
>
> * **It is required to start OpenClaw gateway in the terminal first, then click START in Telegram, otherwise the pairing code will not be received.**

<img class="common_img" src="../_static/media/chapter_21/section_3/image11.png" style="width:700px"  />

<img class="common_img" src="../_static/media/chapter_21/section_3/image12.png" style="width:700px"  />

Step 5: On the first conversation, the Telegram Bot will send a pairing code. Execute the following command on the server to complete the pairing.

<img class="common_img" src="../_static/media/chapter_21/section_3/image13.png" style="width:700px"  />

Step 6: Create a new command line terminal and execute the following command. Note: replace `<code>` in the command with the Pairing code received in Telegram. Do not include the `<>` symbols when entering.

  ```
  openclaw pairing approve telegram <code>
  ```

<img class="common_img" src="../_static/media/chapter_21/section_3/image14.png" style="width:1000px"  />

Step 7: After the command is executed successfully, try chatting with the Bot that has been connected to OpenClaw in Telegram. If the Telegram bot can converse in an AI manner, the OpenClaw connection to Telegram is successfully completed.
Then send a minimal test statement in Telegram, such as `hello`.

<img class="common_img" src="../_static/media/chapter_21/section_3/image15.png" style="width:700px"  />

At this point, the deployment of **OpenClaw** connecting to Telegram has been successfully completed.

## 20.4 OpenClaw Basic Features

### 20.4.1 Controlling Car Movement with OpenClaw

After the program starts running, control the robot movement by entering text, for example **move forward for 1 second, move backward for 2 seconds, and finally turn right for 1 second.** Through OpenClaw's skill matching of tasks and skill descriptions, it then sends messages or services according to the instructions to control the car movement. After executing the task, OpenClaw calls the configured large model through the Agent to generate text and reply.

#### 20.4.1.1 Preparation

Refer to the tutorial **[1. Tutorial/ 19. Large AI Model Courses\19.2 Multimodal Large Model Applications](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/19_Large_AI_Model_Courses.html#_19-2-multimodal-large-model-applications)** to configure the OpenAI API_Key.

Refer to the tutorial: [20.1 Preparation](#anther20.1)

* **Configure Large Model API-KEY**

Refer to the tutorial: [20.2 Large Model API-Key Acquisition and Configuration](#anther20.2)

* **Telegram Application Configuration**

Refer to the tutorial: [20.3 Telegram Application Configuration](#anther20.3)

#### 20.4.1.2 Operational Steps

> [!NOTE]
>
> * **Command input must strictly distinguish between uppercase and lowercase letters and spaces.**
> * **The robot must be connected to the network, configured in STA (LAN) mode or AP (direct connection) mode with a network cable.**
> * **The virtual machine and the robot must be connected to the same LAN, and the IP addresses must be in the same network segment.**
> * **The red terminal is only used to stop the auto-start service.**

**(1) Robot Side Operations**

1. Start the robot and connect it to the remote control software **NoMachine**. For how to connect to the remote desktop, refer to **[1. Tutorial\1. ROSOrin User Manual\1.7 Development Environment Setup](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/1_ROSOrin_User_Manual.html#_1-7-development-environment-setup)**.
2. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image15.png" class="common_img inline-icon"/> to start the terminal. Enter the command to stop the mobile app auto-start service.

```bash
 sudo systemctl stop start_app_node.service
```

3. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal. Enter the command and press **Enter** to start the robot hardware control, which will also start the camera feed.

```
ros2 launch openclaw_controller robot_base_control.launch.py
```

<img src="../_static/media/chapter_21/section_1/image26.png" class="common_img" style="width:600px;"/>

**(2) Virtual Machine Side Operations**

1. Click the desktop icon <img src="../_static/media/chapter_21/section_2/image18.png" class="common_img inline-icon"/> to open the virtual machine system command line terminal.
2. Enter the command to start the OpenClaw gateway service:

```bash
openclaw gateway run
```

3. Open a new terminal, enter the command, and press **Enter** to open the TUI window to send commands.

```
openclaw tui
```

4. Next, enter the command in the TUI window or Telegram chat page: **move forward for 1 second, move backward for 2 seconds** and press **Enter** to control the car movement.

<img src="../_static/media/chapter_21/section_1/image24.png" class="common_img" style="width:900px;"/>

5. After waiting for a period of time, the car will move forward for 1 second, then move backward for 2 seconds, and then generate reply text in the TUI window.

<img src="../_static/media/chapter_21/section_1/image25.png" class="common_img" style="width:900px;"/>

> [!NOTE]
>
> **The answer is automatically generated by the large model. Only the semantic accuracy of the reply is guaranteed, and the text arrangement of the reply is random.**

6. When the TUI window displays the output as shown above, one round of dialogue interaction has ended. Enter a new control command to start the next round of interaction.

   **(3) Close Application**

   1. To experience other basic features, continue entering other control commands according to the basic application tutorial. To experience comprehensive applications, press **Ctrl+C** in each terminal interface on the **robot side** to stop the robot hardware control. If it fails to close, press it multiple times. If it cannot exit, open a new command line terminal and enter the command to clear ROS nodes.

```bash
~/.stop_ros.sh
```

2. To close the OpenClaw application, press **Ctrl+C** in each terminal interface on the **virtual machine side**.

#### 20.4.1.3 Program Outcome

After the application is started, freely organize text and input it into the TUI window or the Telegram chat page on the phone to control the car to move forward, backward, turn left, turn right, and stop.

> [!NOTE]
>
> **The actual running situation will vary depending on different large models, such as the duration of running commands and replies, or the difference between the actual running effect and the command.**

#### 20.4.1.4 Program Analysis

Program path:

**/home/ubuntu/ros2_ws/src/openclaw_controller/openclaw_controller/robot_base_control/claw_move_control.py **

1. Initialize 3 parameters: linear velocity, angular velocity, and stop duration. Create a chassis control node that receives string motion commands, puts the commands into a queue, processes them by a background thread, and finally publishes velocity control messages. It also provides a motion status query service.

```python
        self.default_linear = 0.15
        self.default_angular = 0.45
        self.default_stop_duration = 0.5

        self.cmd_vel_pub = self.create_publisher(Twist, '/controller/cmd_vel', 1)
        self.subscription = self.create_subscription(
            String, '~/chassis_command', self.command_callback, 10)
        self.move_status = 'stop'
        self.create_service(Trigger, '~/move_status', self.move_status_srv_callback)

        self.command_queue = queue.Queue()
        self.client = self.create_client(Trigger, '/init_pose/init_finish')
        self.client.wait_for_service()
        self.worker_thread = threading.Thread(target=self.process_commands, daemon=True)
        self.worker_thread.start()
```

2. When receiving an external request to view the current motion status, this function prints `self.move_status` and returns it through the service response.

```python
    def move_status_srv_callback(self, request, response):
        self.get_logger().info('\033[1;32m Move status: [%s]\033[0m' % self.move_status)
        response.success = True
        response.message = self.move_status
        return response
```

3. This function generates the corresponding chassis velocity control message `Twist` based on the input direction string and updates the robot motion status.

```python
    def parse_twist(self, direction):
        twist = Twist()
        self.move_status = 'moving'
        if direction == 'forward':
            twist.linear.x = self.default_linear
        elif direction == 'backward':
            twist.linear.x = -self.default_linear
        elif direction == 'left':
            twist.linear.x = self.default_linear
            twist.angular.z = self.default_angular
        elif direction == 'right':
            twist.linear.x = self.default_linear
            twist.angular.z = -self.default_angular
        elif direction == 'stop':
            pass
        else:
            return None
        return twist
```

4. This function receives the subscribed string command, cleans and validates it, prints the log, and then puts it into the command queue to wait for the background thread to process.

```python
    def command_callback(self, msg):
        cmd = msg.data.strip()
        if not cmd:
            return
        self.get_logger().info(f'\033[1;34m Command: {cmd}\033[0m')
        self.command_queue.put(cmd)
```

5. This function continuously takes commands to be executed from the command queue and calls the execution function in sequence for processing.

```python
    def process_commands(self):
        while rclpy.ok():
            try:
                cmd = self.command_queue.get(timeout=0.5)
            except queue.Empty:
                continue
            self.execute_command(cmd)
            self.command_queue.task_done()
```

6. This function parses a string compound motion command, executes multiple chassis running actions in sequence, and stops the robot when execution ends or an error occurs.

```python
    def execute_command(self, cmd):
        try:
            cmd = cmd.replace('，', ',')
            parts = [p.strip() for p in cmd.split(',') if p.strip()]
            actions = []
            self.move_status = 'moving'
            for p in parts:
                w = p.split()
                dir = w[0].lower()
                dur = float(w[1]) if len(w) > 1 else self.default_stop_duration
                actions.append((dir, dur))
            
            for i, (dir, dur) in enumerate(actions):
                twist = self.parse_twist(dir)
                if twist is None:
                    self.get_logger().error(f'\033[91mUnknown direction: {dir}\033[0m')
                    self._stop()
                    return
                self.cmd_vel_pub.publish(twist)
                time.sleep(dur)
                if i < len(actions) - 1:
                    self._stop()
                    time.sleep(self.default_stop_duration)
            self._stop()
            self.get_logger().info(f'\033[1;33m Command done\033[0m')
        except Exception as e:
            self.get_logger().error(f'Execution error: {e}')
            self._stop()
```

### 20.4.2 OpenClaw Camera Feed Recognition

After the program starts, enter text to have OpenClaw recognize the current camera feed and save the photo locally. For example: **take a photo, have a look, or what is visible.** OpenClaw matches the task with the corresponding skill description, then subscribes to the ROS2 camera image topic according to the command. After the task is completed, OpenClaw calls the configured large model through the Agent to generate a text reply.

#### 20.4.2.1 Preparation

Refer to the tutorial **[1. Tutorial/19. Large AI Model Courses /19.2 Multimodal Large Model Applications](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/19_Large_AI_Model_Courses.html#_19-2-multimodal-large-model-applications)** to configure the OpenAI API_Key.

Refer to the tutorial: [20.1 Preparation](#anther20.1)

* **Configure Large Model API-KEY**

Refer to the tutorial: [20.2 Large Model API-Key Acquisition and Configuration](#anther20.2)

* **Telegram Application Configuration**

Refer to the tutorial: [20.3 Telegram Application Configuration](#anther20.3)

<p id="p20-4-2-2"></p>

#### 20.4.2.2 Operational Steps

> [!NOTE]
>
> * **Command input must strictly distinguish between uppercase and lowercase letters and spaces.**
> * **The robot must be connected to the network, configured in STA (LAN) mode or AP (direct connection) mode with a network cable.**
> * **The virtual machine and the robot must be connected to the same LAN, and the IP addresses must be in the same network segment.**
> * **The red terminal is only used to stop the auto-start service.**

**(1) Robot Side Operations**

1. Start the robot and connect it to the remote control software **NoMachine**. For how to connect to the remote desktop, refer to **[1 Tutorial \1. ROSOrin User Manual\1.7 Development Environment Setup](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-orin-nano-version/docs/1_ROSOrin_User_Manual.html#_1-7-development-environment-setup)**.
2. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image15.png" class="common_img inline-icon"/> to start the terminal. Enter the command to stop the app auto-start service.

```bash
 sudo systemctl stop start_app_node.service
```

3. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal. Enter the command and press **Enter** to start the robot hardware control, which will also start the camera feed.

```
ros2 launch openclaw_controller robot_base_control.launch.py
```

<img src="../_static/media/chapter_21/section_1/image28.png" class="common_img" style="width:600px;"/>

**(2) Virtual Machine Side Operations**

1. Click the desktop icon <img src="../_static/media/chapter_21/section_2/image18.png" class="common_img inline-icon"/> to open the virtual machine system command line terminal.
2. Enter the command to start the OpenClaw gateway service:

```bash
openclaw gateway run
```

3. Open a new terminal, enter the command, and press **Enter** to open the TUI window to send commands.

```
openclaw tui
```

4. Next, enter the following command in the TUI window or Telegram chat page: **take a picture, tell me what you saw, summarize it for me, and then tell me where you saved it**, then press **Enter** to start image recognition.

<img src="../_static/media/chapter_21/section_1/image29.png" class="common_img" style="width:900px;"/>

5. After waiting for a while, OpenClaw will describe the content of the current image in text form, save the picture, and display the storage path

<img src="../_static/media/chapter_21/section_1/image30.png" class="common_img" style="width:900px;"/>

> [!NOTE]
>
> **The answer is automatically generated by the large model. Only the semantic accuracy of the reply is guaranteed, and the text arrangement of the reply is random.**

6. When the TUI window displays the output as shown above, it means that one round of dialogue interaction has ended. Enter a new control command to start the next round of interaction.

**(3) Close Application**

1. To experience other basic features, continue to enter other control commands according to the basic application tutorial. To experience comprehensive applications, press **Ctrl+C** in the last terminal interface on the **robot side** to stop the robot hardware control. If it fails to close, press it multiple times. If it cannot exit, open a new command line terminal and then enter the command to clear ROS nodes.

```bash
~/.stop_ros.sh
```

2. To close the OpenClaw application, press **Ctrl+C** in each terminal interface on the **virtual machine side**.

#### 20.4.2.3 Program Outcome

After the application is started, freely organize text and input it into the TUI window or the Telegram chat page on the phone. OpenClaw will describe the content of the current image in text form.

> [!NOTE]
>
> **The actual running situation will vary depending on different large models, such as the duration of running commands and replies, or the difference between the actual running effect and the command.**

## 20.5 OpenClaw Comprehensive Applications

### 20.5.1 OpenClaw + Smart Butler

After the program starts running, control the robot navigation by entering text, for example **take me to the zoo to have a look, what is inside, summarize it for me**. Through OpenClaw's skill matching of tasks and skill descriptions, it then sends messages or services according to the instructions to control the car for navigation. After executing the task, OpenClaw calls the configured large model through the Agent to generate text and reply.

#### 20.5.1.1 Preparation

Refer to the tutorial **[1 Tutorial\19. Large AI Model Courses\19.2 Multimodal Large Model Applications](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/19_Large_AI_Model_Courses.html#_19-2-multimodal-large-model-applications)** to configure the OpenAI API_Key.

Refer to the tutorial: [20.1 Preparation](#anther20.1)

Refer to the tutorial: **[1 Tutorial\5. ROS1-Mapping & Navigation Course\5.2 Navigation Tutorial](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/5_ROS1_Mapping_&_Navigation_Course.html#_5-2-navigation-tutorial)** to build the map.

* **Configure Large Model API-KEY**

Refer to the tutorial: [20.2 Large Model API-Key Acquisition and Configuration](#anther20.2)

* **Telegram Application Configuration**

Refer to the tutorial: [20.3 Telegram Application Configuration](#anther20.3)

<p id="anther20.5.1.2"></p>

#### 20.5.1.2 Configure RViz

**① Export rviz file from the robot**

1. Start the robot and connect it to the remote control software **NoMachine**. For how to connect to the remote desktop, refer to [**1 Tutorial \1. ROSOrin User Manual\1.7 Development Environment Setup**](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/1_ROSOrin_User_Manual.html#_1-7-development-environment-setup)

2. Click the desktop icon <img src="../_static/media/chapter_21/section_1/image15.png" class="inline-icon"/> to open the command line terminal. Enter the command to stop the APP auto-start service:

   ```
   sudo systemctl stop start_app_node.service
   ```

3. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal. Enter the command to enter the specified directory:

   ```bash
   cd ros2_ws/src/large_models_examples/large_models_examples/road_network/config
   ```

4. Copy the road network planning rviz file to the shared directory:

   ```bash
   cp navigation_controller.rviz ~/share/tmp
   ```

5. Click the desktop icon <img src="../_static/media/chapter_21/section_1/image67.png" class="inline-icon"/> to open the file directory, then enter the home/docker/tmp directory.

   <img src="../_static/media/chapter_21/section_2/image25.png" class="common_img" style="width:800px;"/>

6. Drag the **navigation_controller.rviz** file in the directory to the computer desktop.

   <img src="../_static/media/chapter_21/section_2/image27.png" class="common_img" style="width:800px;"/>

**② Import file to virtual machine**

1. Click the folder icon on the system desktop <img class="inline-icon" src="../_static/media/chapter_21/section_2/image15.png"  /> to enter the **ros2_ws** directory.

   <img src="../_static/media/chapter_21/section_2/image28.png" class="common_img" style="width:800px;"/>

2. Import the **navigation_controller.rviz** file exported from the robot into the **home/ros2_ws/** directory of the virtual machine by dragging:

   <img src="../_static/media/chapter_21/section_2/image29.png" class="common_img" style="width:800px;"/>

3. Enter the command to refresh the environment configuration:

```
source ~/.bashrc
```

<img src="../_static/media/chapter_21/section_2/image24.png" class="common_img" style="width:800px;"/>

<p id ="anther20.5.1.3"></p>

#### 20.5.1.3 Operational Steps

> [!NOTE]
>
> * **Command input must strictly distinguish between uppercase and lowercase letters and spaces.**
>
> * **The robot must be connected to the network, configured in STA (LAN) mode or AP (direct connection) mode with a network cable.**
>
> * **The virtual machine and the robot must be connected to the same LAN, and the IP addresses must be in the same network segment.**
>
> * **The red terminal is only used to stop the auto-start service.**

**(1) Robot Side Operations**

1. Start the robot and connect it to the remote control software **NoMachine**. For how to connect to the remote desktop, refer to [**1 Tutorial \1. ROSOrin User Manual\1.7 Development Environment Setup**](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/1_ROSOrin_User_Manual.html#_1-7-development-environment-setup).
2. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image15.png" class="common_img inline-icon"/> to start the terminal. Enter the command to stop the app auto-start service.

```bash
sudo systemctl stop start_app_node.service
```

3. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal. Enter the command and press **Enter** to start the robot hardware navigation function.

```
ros2 launch openclaw_controller navigation_manager.launch.py
```

**(2) Virtual Machine Side Operations**

1. Click the desktop icon <img src="../_static/media/chapter_21/section_2/image18.png" class="common_img inline-icon"/> to open the virtual machine system command line terminal.
2. Create a new command line terminal and enter the command in the terminal to enter the RVIZ directory in the workspace.

```
cd ros2_ws/src/navigation/rviz/
```

3. Enter the command to start the RVIZ tool.

```
rviz2 -d navigation_controller.rviz
```

<img src="../_static/media/chapter_21/section_1/image56.png" class="common_img" style="width:1000px;"/>

4. Create a new command line terminal and enter the command to start the OpenClaw gateway service:

```
openclaw gateway run
```

5. Create a new command line terminal, enter the command, and press **Enter** to open the TUI window to send commands.

```
openclaw tui
```

6. Next, enter the command in the TUI window or Telegram chat page: **take me to the zoo to have a look, what is inside, summarize it for me** and press **Enter** to start machine navigation.

> [!NOTE]
>
> - **When the robot is executing navigation/tasks and the TUI window returns errors similar to the following:**
>- **"I don't know the position coordinates of XXX"**
>   **"Sending command failed"**
>   **"Navigation is not started"**
> - **Tell it in the TUI window to use skills to execute the task: go to the zoo to have a look, what is inside, summarize it for me**
>
> - **Note that the reply logic of different models may differ, so the actual execution effect will be different. It is recommended to actively ask it in the TUI what specific commands it just executed based on the current model feedback, and then adjust the subsequent dialogue content based on the returned results to guide the robot to more accurately complete the navigation and task goals.**

7. After waiting for a period of time, the machine will navigate to the target point and observe the front, and then generate reply text in the TUI window.

<img src="../_static/media/chapter_21/section_1/image57.png" class="common_img" style="width:400px;"/>

> [!NOTE]
>
> **The answer is automatically generated by the large model. Only the semantic accuracy of the reply is guaranteed, and the text arrangement of the reply is random.**

8. When the TUI window displays the output as shown above, it means that one round of dialogue interaction has ended. Enter a new control command to start the next round of interaction.

**(3) Close Application**

1. To experience other basic features, continue to enter other control commands according to the basic application tutorial. To experience comprehensive applications, press **Ctrl+C** in the last opened terminal interface to stop the robot hardware control. If it fails to close, press it multiple times. If it cannot exit, open a new command line terminal and then enter the command to clear ROS nodes.

```bash
~/.stop_ros.sh
```

2. To close the OpenClaw application, press **Ctrl+C** in each terminal interface.

#### 20.5.1.4 Program Outcome

After the application is started, freely organize text and input it into the TUI window or the Telegram chat page on the phone to control the machine for navigation.

> [!NOTE]
>
> **The actual running situation will vary depending on different large models, such as the duration of running commands and replies, or the difference between the actual running effect and the command.**

#### 20.5.1.5 Step-by-Step Debugging

> [!NOTE]
>
> **If OpenClaw does not successfully run the program after entering a text command in the TUI window, enter commands step by step for testing to observe at which step there is an error message.**

**(1) Robot Side Operations**

1. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image15.png" class="common_img inline-icon"/> to start the terminal.

2. Enter the command to stop the app auto-start service.

```bash
sudo systemctl stop start_app_node.service
```

3. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal. Enter the command to start the application:

```
ros2 launch openclaw_controller navigation_manager.launch.py
```

**(2) Virtual Machine Side Operations**

1. Click the desktop icon <img src="../_static/media/chapter_21/section_2/image18.png" class="common_img inline-icon"/> to open the virtual machine system command line terminal.
2. Navigate to a certain target point. The data is the location value to be passed in:

```
ros2 service call /claw_navigation_manager/set_pose interfaces/srv/SetString "{data: 'zoo'}"
```

3. Test camera photo:

```
bash -lc '~/.openclaw/workspace/skills/ros2-cam-subscribe/scripts/cam_subscribe.sh --topic /depth_cam/rgb0/image_raw --output-dir /home/ubuntu/.openclaw/workspace/images --timeout 8'
```

#### 20.5.1.6 Navigation Point Modification

1. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal.
2. Enter the command to enter the corresponding path.

```
cd ros2_ws/src/openclaw_controller/config
```

3. Enter the command to edit the yaml file.

```
gedit navigation_position.yaml 
```

4. Only modify the values of the coordinate points `x`, `y` and `yaw`.

<img src="../_static/media/chapter_21/section_1/image58.png" class="common_img" style="width:800px;"/>

5. After modification, press **Ctrl+s**  to save and exit. Then run the application again according to [20.5.1.3 Operational Steps](#anther20.5.1.3).

### 20.5.2 OpenClaw + Smart Community

After the program starts running, control the robot navigation by entering text, for example **take me to the park to see what is there**. Through OpenClaw's skill matching of tasks and skill descriptions, it then sends messages or services according to the instructions to control the car for navigation. After executing the task, OpenClaw calls the configured large model through the Agent to generate text and reply.

#### 20.5.2.1 Preparation

Refer to the tutorial [**1. Tutorial \19. AI Large AI Model Courses\19.2  Multimodal Large Model Applications**](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/19_Large_AI_Model_Courses.html#_19-2-multimodal-large-model-applications) to configure the OpenAI API_Key.

Refer to the tutorial: [20.1 Preparation](#anther20.1)

Refer to the tutorial: **[1 Tutorial \5. ROS1-Mapping & Navigation Course\5.1 Mapping Tutorial](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/5_ROS1_Mapping_&_Navigation_Course.html#_5-1-mapping-tutorial)** to build the map and use road network planning to plan the navigation waypoints.

* **Configure Large Model API-KEY**

Refer to the tutorial: [20.2 Large Model API-Key Acquisition and Configuration](#anther20.2)

* **Telegram Application Configuration**

Refer to the tutorial: [20.3 Telegram Application Configuration](#anther20.3)

#### 20.5.2.2 Configure RViz

**① Export rviz file from the robot**

1. Start the robot and connect it to the remote control software **NoMachine**. For how to connect to the remote desktop, refer to **[1 Tutorial\1. ROSOrin User Manual\1.7 Development Environment Setup](https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/docs/1_ROSOrin_User_Manual.html#_1-7-development-environment-setup)**.

2. Click the desktop icon <img src="../_static/media/chapter_21/section_1/image15.png" class="inline-icon"/> to open the command line terminal. Enter the command to stop the APP auto-start service:

   ```
   sudo systemctl stop start_app_node.service
   ```

4. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal. Enter the command to enter the specified directory:

   ```bash
   cd ros2_ws/src/large_models_examples/large_models_examples/road_network/config
   ```

5. Copy the road network planning rviz file to the shared directory:

   ```bash
   cp navigation_road_network.rviz ~/share/tmp
   ```

6. Click the desktop icon <img src="../_static/media/chapter_21/section_1/image67.png" class="inline-icon"/> to open the file directory, then enter the **home/docker/tmp** directory.

   <img src="../_static/media/chapter_21/section_2/image25.png" class="common_img" style="width:800px;"/>

7. Drag the **navigation_road_network.rviz** file in the directory to the computer desktop.

   <img src="../_static/media/chapter_21/section_2/image27.png" class="common_img" style="width:800px;"/>

**② Import file to virtual machine**

1. Click the folder icon on the system desktop <img class="inline-icon" src="../_static/media/chapter_21/section_2/image15.png"  /> to enter the **ros2_ws** directory.

   <img src="../_static/media/chapter_21/section_2/image28.png" class="common_img" style="width:800px;"/>

2. Import the **navigation_road_network.rviz** file exported from the robot into the **home/ros2_ws/** directory of the virtual machine by dragging:

   <img src="../_static/media/chapter_21/section_2/image29.png" class="common_img" style="width:800px;"/>

3. Enter the command to refresh the environment configuration:

```
source ~/.bashrc
```

<img src="../_static/media/chapter_21/section_2/image24.png" class="common_img" style="width:800px;"/>

<p id ="anther20.5.2.3"></p>

#### 20.5.2.3 Operational Steps

**(1) Robot Side Operations**

1. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image15.png" class="common_img inline-icon"/> to start the terminal.

2. Enter the command to stop the app auto-start service.

```bash
sudo systemctl stop start_app_node.service
```

3. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal. Enter the command and press **Enter** to start the comprehensive test.

```bash
ros2 launch openclaw_controller smart_scene_navigation.launch.py  navigation_mode:="smart_community"
road_network_map:="road_network_community"
```

**(2) Virtual Machine Side Operations**

1. Click the desktop icon <img src="../_static/media/chapter_21/section_2/image18.png" class="common_img inline-icon"/> to open the virtual machine system command line terminal.
2. Create a new command line terminal and enter the command in the terminal to enter the directory in the workspace and start the RVIZ tool.

```bash
cd ~/ros2_ws/ && rviz2 -d navigation_road_network.rviz
```

<img src="../_static/media/chapter_21/section_1/image59.png" class="common_img" style="width:1000px;"/>

3. Create a new command line terminal and enter the command to start the OpenClaw gateway service:

```
openclaw gateway run
```

4. Create a new command line terminal, enter the command, and press **Enter** to open the TUI window to send commands.

```bash
openclaw tui
```

5. Next, enter the command in the TUI window or Telegram chat page: **take me to the park to see what is there** and press **Enter** to start machine navigation.

> [!NOTE]
>
> **Before running the application, enter and send in the TUI window: What places are currently reachable? to confirm the id numbers corresponding to the currently reachable navigation points. Because OpenClaw has memory, if the navigation points do not correspond to the id numbers, enter and send: I restarted the program, what places are currently reachable? to let OpenClaw re-read the yaml file.**

6. After waiting for a period of time, the robot will navigate, and then generate reply text in the TUI window.

> [!NOTE]
>
> - **When the robot is executing navigation/tasks and the TUI window returns errors similar to the following:**
>- **"I don't know the position coordinates of XXX"**
>   **"Sending command failed"**
>   **"Navigation is not started"**
> 
>- **Tell it in the TUI window to use skills to execute the task: take me to the park to see what is there**
> 
>- **Note that the reply logic of different models may differ, so the actual execution effect will be different. It is recommended to actively ask it in the TUI what specific commands it just executed based on the current model feedback, and then adjust the subsequent dialogue content based on the returned results to guide the robot to more accurately complete the navigation and task goals.**

<img src="../_static/media/chapter_21/section_1/image60.jpg" class="common_img" style="width:800px;"/>

> [!NOTE]
>
> **The answer is automatically generated by the large model. Only the semantic accuracy of the reply is guaranteed, and the text arrangement of the reply is random.**

7. When the TUI window displays the output as shown above, it means that one round of dialogue interaction has ended. Enter a new control command to start the next round of interaction.

**(3) Close Application**

1. To experience other basic features, continue to enter other control commands according to the basic application tutorial. To experience comprehensive applications, press **Ctrl+C** in the terminal interface on the **robot side** to stop the robot hardware control. If it fails to close, press it multiple times. If it cannot exit, open a new command line terminal and then enter the command to clear ROS nodes.

```bash
~/.stop_ros.sh
```

2. To close the OpenClaw application, press **Ctrl+C** in the terminal interface on the **virtual machine side**.

#### 20.5.2.4 Program Outcome

After the application is started, freely organize text and input it into the TUI window or the Telegram chat page on the phone to control the machine for navigation.

> [!NOTE]
>
> **The actual running situation will vary depending on different large models, such as the duration of running commands and replies, or the difference between the actual running effect and the command.**

#### 20.5.2.5 Step-by-Step Debugging

> [!NOTE]
>
> **If OpenClaw does not successfully run the program after entering a text command in the TUI window, enter commands step by step for testing to observe at which step there is an error message.**

**(1) Robot Side Operations**

1. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image15.png" class="common_img inline-icon"/> to start the terminal.

2. Enter the command to stop the app auto-start service.

```bash
sudo systemctl stop start_app_node.service
```

3. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal. Enter the command and press **Enter** to start the application:

```bash
ros2 launch openclaw_controller smart_scene_navigation.launch.py  navigation_mode:="smart_community" road_network_map:="road_network_community"
```

**(2) Virtual Machine Side Operations**

1. Click the desktop icon <img src="../_static/media/chapter_21/section_2/image18.png" class="common_img inline-icon"/> to open the virtual machine system command line terminal.

2. Enter the command to query navigable navigation points and id numbers.

```bash
ros2 service call /claw_navigation_manager/list_positions std_srvs/srv/Trigger {}
```

3. Publish the navigation point according to the queried id to navigate to the express station. The data is the id value of the express station to be passed in:

```bash
ros2 topic pub /request_waypoint std_msgs/msg/Int32 "data: 1" --once
```

4. Publish the navigation point according to the queried id to navigate to the supermarket. The data is the id value of the supermarket to be passed in:

```bash
ros2 topic pub /request_waypoint std_msgs/msg/Int32 "data: 3" --once
```

#### 20.5.2.6 Navigation Point Modification

> [!NOTE]
>
> **The id of the modified navigation point must be consistent with the path point sequence id of the road network planning.**

1. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal.
2. Enter the command to enter the corresponding path.

```
cd ros2_ws/src/openclaw_controller/config
```

3. Enter the command to edit the yaml file.

```
gedit smart_community.yaml 
```

4. Only modify the id of the coordinate points.

<img src="../_static/media/chapter_21/section_1/image61.png" class="common_img" style="width:500px;"/>

5. After modification, press **Ctrl+S** to save and exit. Then run the application again according to [20.5.2.3 Operational Steps](#anther20.5.2.3).

#### 20.5.2.7 Road Network Modification

> [!NOTE]
>
> **When only small adjustments to the position or pose of existing path points are needed, directly modify the .yaml file.**

1. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image15.png" class="common_img inline-icon"/> to start the terminal. Enter the command to stop the mobile app auto-start service.

```bash
sudo systemctl stop start_app_node.service
```

2. Click the command line terminal icon on the left side of the system interface <img src="../_static/media/chapter_21/section_1/image69.png" class="common_img inline-icon"/> to start the terminal. Enter the command to enter the specified directory:

```bash
cd ros2_ws/src/large_models_examples/large_models_examples/road_network/config
```

3. Open the yaml file of the corresponding community road network.

```
gedit road_network_community.yaml
```
4. Make small adjustments to the position or pose of existing path points according to the actual situation.

> **id: The number of each path point in the road network**
>
> **pose: [x, y, theta]: That is, the spatial pose of the robot at this node, which is two-dimensional plane coordinates + heading angle.**
>
> **to: The ID list of other path points that the current path point can directly reach**

<img src="../_static/media/chapter_21/section_2/image35.png" class="common_img" style="width:800px;"/>

5. After modification, press **Ctrl+S** to save and exit. Then run the application again according to [20.5.2.3 Operational Steps](#anther20.5.2.3).
