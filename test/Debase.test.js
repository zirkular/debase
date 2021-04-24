const {
  BN,           // Big Number support 
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const { assert, expect } = require("chai");

const Debase = artifacts.require("Debase");

contract("Debase contract", accounts => {
  let debaseInstance;

  beforeEach(async () => {
    debaseInstance = await Debase.new();
  });

  it("project list is empty before a new one was added", async function() {
    const projects = await debaseInstance.getProjects();
    assert.equal(projects.length, 0);
  });

  it("project list is not empty after a new one was added", async function() {
    await debaseInstance.addProject("Default");
    const projects = await debaseInstance.getProjects();
    assert.equal(projects.length, 1);
  });

  it("project name is set after it was added", async function() {
    await debaseInstance.addProject("Default");
    const projects = await debaseInstance.getProjects();
    assert.equal(projects[0].name, "Default");
  });

  it("project name cannot be used twice", async function() {
    await debaseInstance.addProject("Default");
    await debaseInstance.addProject("Default");
  });
});
