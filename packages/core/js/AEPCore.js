/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.

@flow
@format
*/

'use strict';

const RCTAEPCore = require('react-native').NativeModules.AEPCore;

import type {AEPExtensionEvent} from './models/AEPExtensionEvent';

module.exports = {

  /**
   * Returns the version of the AEPCore extension
   * @param  {string} Promise a promise that resolves with the extension verison
   */
  extensionVersion(): Promise<string> {
    return Promise.resolve(RCTAEPCore.extensionVersion());
  },

  /**
   * Load remote configuration specified by the given application ID
   *
   * Configure the SDK by downloading the remote configuration file hosted on Adobe servers
   * specified by the given application ID. The configuration file is cached once downloaded
   * and used in subsequent calls to this API. If the remote file is updated after the first
   * download, the updated file is downloaded and replaces the cached file.
   *
   * The appid is preserved, and on application restarts, the remote configuration file specified by \p appid
   * is downloaded and applied to the SDK.
   *
   * On failure to download the remote configuration file, the SDK is configured using the cached
   * file if it exists, or if no cache file exists then the existing configuration remains unchanged.
   *
   * Calls to this API will replace any existing SDK configuration except those set using
   * AEPCore::updateConfiguration: or AEPCore::setPrivacyStatus:. Configuration updates
   * made using AEPCore::updateConfiguration:
   * and AEPCore::setPrivacyStatus: are always applied on top of configuration changes made using this API.
   *
   * @param  {String?} appId a unique identifier assigned to the app instance by the Adobe Mobile Services. It is automatically
   * added to the ADBMobile JSON file when downloaded from the Adobe Mobile Services UI and can be
   * found in Manage App Settings. A value of `nil` has no effect.
   */
  configureWithAppId(appId?: String) {
    RCTAEPCore.configureWithAppId(appId);
  },

  /**
   * Update specific configuration parameters
   *
   * Update the current SDK configuration with specific key/value pairs. Keys not found in the current
   * configuration are added. Configuration updates are preserved and applied over existing or new
   * configurations set by calling AEPCore::configureWithAppId: or AEPCore::configureWithFileInPath:,
   * even across application restarts.
   *
   * Using `nil` values is allowed and effectively removes the configuration parameter from the current configuration.
   *
   * @param  {{ string: any }?} configMap configuration key/value pairs to be updated or added. A value of `nil` has no effect.
   */
  updateConfiguration(configMap?: { string: any }) {
    RCTAEPCore.updateConfiguration(configMap);
  },

  /**
   * Set the logging level of the SDK
   *
   * @param {AEPMobileLogLevel} mode AEPMobileLogLevel to be used by the SDK
   */
  setLogLevel(mode: string) {
    RCTAEPCore.setLogLevel(mode);
  },

  /**
   * Get the {@link AEPMobileLogLevel} level for the Mobile SDK
   * @return the set {@code AEPMobileLogLevel}
   */
  getLogLevel(): Promise<string> {
    return RCTAEPCore.getLogLevel();
  },

  /**
	 * Sends a log message of the given {@code AEPMobileLogLevel}. If the specified {@code mode} is
	 * more verbose than the current {@link AEPMobileLogLevel} set from {@link #setLogLevel(AEPMobileLogLevel)}
	 * then the message is not printed.
	 *
	 * @param mode the {@link AEPMobileLogLevel} used to print the message
	 * @param tag used to identify the source of the log message
	 * @param message the message to log
	 */
  log(logLevel: string, tag: string, message: string) {
    RCTAEPCore.log(logLevel, tag, message);
  },

  /**
   * Set the Adobe Mobile Privacy status
   *
   * @param {AEPMobilePrivacyStatus} privacyStatus AEPMobilePrivacyStatus to be set to the SDK
   */
  setPrivacyStatus(privacyStatus: string) {
    RCTAEPCore.setPrivacyStatus(privacyStatus);
  },

  /**
   * Get the current Adobe Mobile Privacy Status
   *
   * @return {AEPMobilePrivacyStatus} the current privacy status
   */
  getPrivacyStatus(): Promise<string> {
    return RCTAEPCore.getPrivacyStatus();
  },

  /**
   * Calls the provided callback with a JSON string containing all of the user's identities known by the SDK
   *
   * @return {string?} known identifier as a JSON string
   */
  getSdkIdentities(): Promise<?string> {
    return RCTAEPCore.getSdkIdentities();
  },

  /**
   * Called by the extension public API to dispatch an event for other extensions or the internal SDK to consume.
   * Any events dispatched by this call will not be processed until after `start` has been called.
   *
   * @param event Required parameter with {@link Event} instance to be dispatched. Should not be nil
   * @return true if the the event dispatching operation succeeded, otherwise the promise will return an error
   */
  dispatchEvent(event: AEPExtensionEvent): Promise<boolean> {
    return RCTAEPCore.dispatchEvent(event);
  },

  /**
	 * This method will be used when the provided {@code AEPExtensionEvent} is used as a trigger and a response event
	 * is expected in return. The returned event needs to be sent using
	 * {@link #dispatchResponseEvent(Event, Event, ExtensionErrorCallback)}.
	 * <p>
	 *
	 * @param event            required parameter, {@link AEPExtensionEvent} instance to be dispatched, used as a trigger
	 * @param responseCallback required parameters, {@link Promise} to be called with the response event received
	 *
	 * @see AEPCore#dispatchResponseEvent(Event, Event, ExtensionErrorCallback)
   */
  dispatchEventWithResponseCallback(event: AEPExtensionEvent): Promise<AEPExtensionEvent> {
    return RCTAEPCore.dispatchEventWithResponseCallback(event);
  },

  /**
   * Android Only
	 * Dispatches a response event for a paired event that was sent to {@code dispatchEventWithResponseCallback}
	 * and received by an extension listener {@code hear} method.
	 *
	 * @param responseEvent required parameter, {@link AEPExtensionEvent} instance to be dispatched as a response for the
	 *                      event sent using {@link AEPCore#dispatchEventWithResponseCallback(AEPExtensionEvent)}
	 * @param requestEvent  required parameter, the event sent using
	 * 						{@link AEPCore#dispatchEventWithResponseCallback(AEPExtensionEvent)}
	 * @return {@code boolean} indicating if the the event dispatching operation succeeded
	 *
	 * @see AEPCore#dispatchEventWithResponseCallback(AEPExtensionEvent)
   */
  dispatchResponseEvent(responseEvent: AEPExtensionEvent, requestEvent: AEPExtensionEvent): Promise<boolean> {
    return RCTAEPCore.dispatchResponseEvent(responseEvent, requestEvent);
  },

  /**
   * This method sends a generic Analytics action tracking hit with context data.
   *
   *  Actions represent events that occur in your application that you want to measure; the corresponding metrics will
   *  be incremented each time the event occurs. For example, you may want to track when an user click on the login
   *  button or a certain article was viewed.
   *
   *  note: when using the Adobe Analytics extension, calling this API will increment page views
   * @param  {String?} state containing the name of the state to track
   * @param  {{ string: string }?} contextData containing context data to attach on this hit
   */
  trackAction(action?: String, contextData?: { string: string }) {
    RCTAEPCore.trackAction(action, contextData);
  },

  /**
   * This method sends a generic Analytics state tracking hit with context data.
   *
   *  States represent different screens or views of you application. When the user navigates between application pages,
   *  a new track call should be sent with current state name. Tracking state name is typically called from a
   *  Component in the componentDidMount function.
   *
   *  note: when using the Adobe Analytics extension, calling this API will increment page views
   * @param  {String?} state containing the name of the state to track
   * @param  {{ string: string }?} contextData containing context data to attach on this hit
   */
  trackState(state?: String, contextData?: { string: string }) {
    RCTAEPCore.trackState(state, contextData);
  },

  /**
   * Submits a generic event containing the provided IDFA with event type `generic.identity`.
   *
   * When using the Adobe Identity extension, the following applies:
   *   - If the IDFA was set in the SDK, the IDFA will be sent in lifecycle. It can also be accessed in Signals (Postbacks).
   *   - This ID is preserved between app upgrades, is saved and restored during the standard application backup process,
   *     and is removed at uninstall.
   *   - If the Mobile SDK is configured with `identity.adidEnabled` set to `false`, then the advertising identifier
   *     is not set or stored.
   *
   * @param {String?} advertisingIdentifier the advertising idenifier string.
   */
    setAdvertisingIdentifier(advertisingIdentifier?: String) {
    RCTAEPCore.setAdvertisingIdentifier(advertisingIdentifier);
  },

  /**
   * Submits a generic event containing the provided push token with event type `generic.identity`.
   *
   * When using the Adobe Identity extension, the following applies:
   *   - If the current SDK privacy status is \ref AEPMobilePrivacyStatusOptOut, then the push identifier is not set.
   *
   * @param {String?} pushIdentifier the device token for push notifications
   */
  setPushIdentifier(pushIdentifier?: String) {
    RCTAEPCore.setPushIdentifier(pushIdentifier);
  },

  /**
   * Collect PII data. Although using this call enables collection of PII data, the SDK does not
   * automatically send the data to any Adobe endpoint.
   * @param  {{ string: string }} data the dictionary containing the PII data to be collected
   */
  collectPii(data: { string: string }) {
    RCTAEPCore.collectPii(data);
  },

  /**
	 * Sets the resource Id for small icon.
	 * @param resourceID the resource Id of the icon
	 */
  setSmallIconResourceID(resourceID: number) {
    RCTAEPCore.setSmallIconResourceID(resourceID);
  },

  /**
	 * Sets the resource Id for large icon.
	 * @param resourceID the resource Id of the icon
	 */
  setLargeIconResourceID(resourceID: number) {
    RCTAEPCore.setLargeIconResourceID(resourceID);
  },

  /**
   * iOS Only
   * @brief set the app group used to sharing user defaults and files among containing app and extension apps
   * @note This *must* be called in AppDidFinishLaunching and before any other interactions with the Adobe Mobile library have happened.
   * Only the first call to this function will have any effect.
   * @platform ios
   */
  setAppGroup(appGroup?: String) {
    RCTAEPCore.setAppGroup(appGroup);
  },

};
